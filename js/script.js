document.addEventListener("DOMContentLoaded", () => {
  const homeText = document.getElementById("homeText");

  if (!homeText) return;

  // Animate only when opening the Home section.
  if (!location.hash || location.hash === "#home") {
    requestAnimationFrame(() => {
      homeText.classList.add("animation-slideUp");
    });
  }
});
const form = document.querySelector("form");
const formStatus = document.getElementById("formStatus");

function showFormStatus(message, isError) {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  showFormStatus("", false);

  const submitButton = form.querySelector("button[type='submit']");
  const originalLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      showFormStatus(
        "Thank you! Your message was sent. I will reply soon.",
        false,
      );
      form.reset();
    } else {
      showFormStatus("Something went wrong. Please try again.", true);
    }
  } catch {
    showFormStatus(
      "Something went wrong. Please check your connection and try again.",
      true,
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
});
// Smooth scrolling only when a link on the page is clicked.
// Keeping it off normally stops refreshes from being interrupted mid-scroll.
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.documentElement.classList.add("smooth-scroll");
    clearTimeout(window.smoothScrollTimer);
    window.smoothScrollTimer = setTimeout(() => {
      document.documentElement.classList.remove("smooth-scroll");
    }, 1200);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLink = document.querySelector(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLink.classList.toggle("active");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLink.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLink.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let userHasScrolled = false;
["wheel", "touchstart", "keydown", "mousedown"].forEach((evt) =>
  window.addEventListener(evt, () => (userHasScrolled = true), {
    passive: true,
  }),
);

function alignToHash() {
  if (userHasScrolled) return;
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }
}

window.addEventListener("load", alignToHash);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(alignToHash);
}
