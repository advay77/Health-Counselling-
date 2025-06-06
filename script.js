// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Services tabs functionality
const tabButtons = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all buttons and panes
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabPanes.forEach((pane) => pane.classList.remove("active"))

    // Add active class to clicked button and corresponding pane
    button.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Testimonials slider
let currentSlide = 0
const testimonialCards = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")

function showSlide(index) {
  testimonialCards.forEach((card) => card.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  testimonialCards[index].classList.add("active")
  dots[index].classList.add("active")
}

// Auto-rotate testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialCards.length
  showSlide(currentSlide)
}, 5000)

// Manual testimonial navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Form submission
const enquiryForm = document.getElementById("enquiryForm")
const submitBtn = enquiryForm.querySelector(".submit-btn")
const btnText = submitBtn.querySelector(".btn-text")
const btnLoader = submitBtn.querySelector(".btn-loader")
const successModal = document.getElementById("successModal")
const closeModal = document.querySelector(".close")

enquiryForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Show loading state
  submitBtn.disabled = true
  btnText.style.display = "none"
  btnLoader.style.display = "inline-block"

  // Collect form data
  const formData = new FormData(enquiryForm)
  const data = Object.fromEntries(formData.entries())

  try {
    const response = await fetch("/api/submit-enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
      // Show success modal
      successModal.style.display = "block"
      enquiryForm.reset()
    } else {
      alert("There was an error submitting your enquiry. Please try again.")
    }
  } catch (error) {
    console.error("Error:", error)
    alert("There was an error submitting your enquiry. Please try again.")
  } finally {
    // Reset button state
    submitBtn.disabled = false
    btnText.style.display = "inline-block"
    btnLoader.style.display = "none"
  }
})

// Modal functionality
closeModal.addEventListener("click", () => {
  successModal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.style.display = "none"
  }
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".feature-card, .service-content, .contact-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Form validation
function validateForm() {
  const requiredFields = enquiryForm.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444"
      isValid = false
    } else {
      field.style.borderColor = "#e5e7eb"
    }
  })

  // Email validation
  const emailField = document.getElementById("email")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailField.value && !emailRegex.test(emailField.value)) {
    emailField.style.borderColor = "#ef4444"
    isValid = false
  }

  // Phone validation
  const phoneField = document.getElementById("phone")
  const phoneRegex = /^[0-9]{10}$/
  if (phoneField.value && !phoneRegex.test(phoneField.value.replace(/\D/g, ""))) {
    phoneField.style.borderColor = "#ef4444"
    isValid = false
  }

  return isValid
}

// Real-time validation
enquiryForm.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", validateForm)
  field.addEventListener("input", () => {
    if (field.value.trim()) {
      field.style.borderColor = "#e5e7eb"
    }
  })
})

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      // Close all open items
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      // Toggle current
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
});
