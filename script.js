/* =========================================================
   Kavita Yadav — Portfolio
   Vanilla JS: menu, scroll effects, reveals, contact form
   ========================================================= */
(function () {
  "use strict";

  // Enable reveal styles only when JS runs, so content never stays hidden without it.
  document.documentElement.classList.add("js");

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("siteNav");
  var menuBtn = document.getElementById("menuBtn");
  var progressBar = document.getElementById("progressBar");

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  window
    .matchMedia("(min-width: 821px)")
    .addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });

  /* ---------- Header state + progress bar (one rAF-throttled handler) ---------- */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 24);
    progressBar.style.transform =
      "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(
    nav.querySelectorAll("a[href^='#']"),
  );
  var sections = navLinks
    .map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            navLinks.forEach(function (a) {
              var active = a.getAttribute("href") === id;
              a.classList.toggle("active", active);
              if (active) a.setAttribute("aria-current", "true");
              else a.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* ---------- Placeholder links should not jump to the top ---------- */
  document
    .querySelectorAll("a[href='#'][data-placeholder-link]")
    .forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");

  var rules = {
    name: function (v) {
      if (v.trim().length < 2) return "Please enter your name.";
      return "";
    },
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
        return "That email address doesn't look right.";
      return "";
    },
    message: function (v) {
      if (v.trim().length < 10)
        return "Please write at least a short sentence (10 characters).";
      return "";
    },
  };

  function validateField(name) {
    var input = form.elements[name];
    var wrapper = input.closest(".field");
    var error = document.getElementById(name + "-error");
    var msg = rules[name](input.value);
    error.textContent = msg;
    wrapper.classList.toggle("invalid", Boolean(msg));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  Object.keys(rules).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener("blur", function () {
      validateField(name);
    });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("invalid"))
        validateField(name);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.className = "form-status";
    statusEl.textContent = "";

    var valid = true;
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name)) {
        valid = false;
        if (!firstInvalid) firstInvalid = form.elements[name];
      }
    });

    if (!valid) {
      firstInvalid.focus();
      statusEl.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    /* Sends the form data to a Google Sheet through a Google Apps Script web app.
       Set the Web app URL in the form's data-sheet-url attribute (index.html). */
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.textContent = "Sending...";

    var data = new URLSearchParams({
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value,
      message: form.elements.message.value.trim(),
    });

    fetch(form.getAttribute("data-sheet-url"), {
      method: "POST",
      body: data,
      mode: "no-cors",
    })
      .then(function () {
        statusEl.className = "form-status ok";
        statusEl.textContent = "Thank you! Your message has been received.";
        form.reset();
      })
      .catch(function () {
        statusEl.textContent = "Something went wrong. Please try again.";
      })
      .then(function () {
        btn.disabled = false;
      });
  });
})();
