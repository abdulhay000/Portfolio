const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("Thank you for your submission, we will respond shortly!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Something went wrong. Please check your connection and try again.");
  }
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

const observer = new IntersectionObserver(
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

sections.forEach((section) => observer.observe(section));
