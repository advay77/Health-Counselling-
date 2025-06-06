// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initCollegeFilters()
  initCourseTabs()
  initTestimonialSlider()
  initContactForm()
  initScrollEffects()
})

// Navigation functionality
function initNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "#ffffff"
      navbar.style.backdropFilter = "none"
    }
  })
}

// College data and filtering
const collegesData = [
  {
    name: "All Institute of Medical Sciences (AIIMS)",
    location: "New Delhi",
    course: "MBBS",
    state: "Delhi",
    type: "Government",
    fees: "₹1,466",
    rating: 4.9,
    established: 1956,
  },
  {
    name: "Christian Medical College",
    location: "Vellore, Tamil Nadu",
    course: "MBBS",
    state: "Tamil Nadu",
    type: "Private",
    fees: "₹4,50,000",
    rating: 4.8,
    established: 1900,
  },
  {
    name: "King George's Medical University",
    location: "Lucknow, Uttar Pradesh",
    course: "MBBS",
    state: "Uttar Pradesh",
    type: "Government",
    fees: "₹50,000",
    rating: 4.6,
    established: 1905,
  },
  {
    name: "Kasturba Medical College",
    location: "Manipal, Karnataka",
    course: "MBBS",
    state: "Karnataka",
    type: "Private",
    fees: "₹18,50,000",
    rating: 4.5,
    established: 1953,
  },
  {
    name: "Maulana Azad Medical College",
    location: "New Delhi",
    course: "MBBS",
    state: "Delhi",
    type: "Government",
    fees: "₹5,500",
    rating: 4.7,
    established: 1958,
  },
  {
    name: "JSS Medical College",
    location: "Mysore, Karnataka",
    course: "MBBS",
    state: "Karnataka",
    type: "Private",
    fees: "₹12,00,000",
    rating: 4.4,
    established: 1982,
  },
  {
    name: "Government Medical College",
    location: "Thiruvananthapuram, Kerala",
    course: "MBBS",
    state: "Kerala",
    type: "Government",
    fees: "₹15,000",
    rating: 4.3,
    established: 1951,
  },
  {
    name: "Sri Ramachandra Medical College",
    location: "Chennai, Tamil Nadu",
    course: "MBBS",
    state: "Tamil Nadu",
    type: "Private",
    fees: "₹16,50,000",
    rating: 4.2,
    established: 1985,
  },
]

function initCollegeFilters() {
  const courseFilter = document.getElementById("courseFilter")
  const stateFilter = document.getElementById("stateFilter")
  const typeFilter = document.getElementById("typeFilter")
  const collegesGrid = document.getElementById("collegesGrid")

  // Initial render
  renderColleges(collegesData)

  // Add event listeners for filters
  ;[courseFilter, stateFilter, typeFilter].forEach((filter) => {
    filter.addEventListener("change", filterColleges)
  })

  function filterColleges() {
    const courseValue = courseFilter.value
    const stateValue = stateFilter.value
    const typeValue = typeFilter.value

    const filteredColleges = collegesData.filter((college) => {
      return (
        (!courseValue || college.course === courseValue) &&
        (!stateValue || college.state === stateValue) &&
        (!typeValue || college.type === typeValue)
      )
    })

    renderColleges(filteredColleges)
  }

  function renderColleges(colleges) {
    if (colleges.length === 0) {
      collegesGrid.innerHTML = '<p class="no-results">No colleges found matching your criteria.</p>'
      return
    }

    collegesGrid.innerHTML = colleges
      .map(
        (college) => `
            <div class="college-card">
                <div class="college-header">
                    <h3>${college.name}</h3>
                    <div class="college-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${college.location}</span>
                    </div>
                </div>
                <div class="college-body">
                    <div class="college-info">
                        <div class="info-item">
                            <div class="label">Course</div>
                            <div class="value">${college.course}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Type</div>
                            <div class="value">${college.type}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Annual Fees</div>
                            <div class="value">${college.fees}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Established</div>
                            <div class="value">${college.established}</div>
                        </div>
                    </div>
                    <div class="college-rating">
                        <div class="stars">
                            ${"★".repeat(Math.floor(college.rating))}${"☆".repeat(5 - Math.floor(college.rating))}
                        </div>
                        <span>${college.rating}/5</span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Course tabs functionality
function initCourseTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      this.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

// Testimonial slider functionality
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
    testimonials[index].classList.add("active")
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
    showTestimonial(currentTestimonial)
  }

  // Event listeners
  nextBtn.addEventListener("click", nextTestimonial)
  prevBtn.addEventListener("click", prevTestimonial)

  // Auto-slide every 5 seconds
  setInterval(nextTestimonial, 5000)
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const formMessage = document.getElementById("formMessage")

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Show loading state
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"
    submitBtn.disabled = true

    // Collect form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        showMessage("Thank you for your message! We will get back to you soon.", "success")
        contactForm.reset()
      } else {
        showMessage(result.message || "Something went wrong. Please try again.", "error")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("Network error. Please check your connection and try again.", "error")
    } finally {
      // Reset button state
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      submitBtn.disabled = false
    }
  })

  function showMessage(message, type) {
    formMessage.textContent = message
    formMessage.className = `form-message ${type}`
    formMessage.style.display = "block"

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for fade-in animations
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
  const animatedElements = document.querySelectorAll(".service-card, .college-card, .detail-card, .testimonial")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Smooth scroll to top button (optional)
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `

  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Fade-in effect for main sections
function fadeInOnScroll() {
  const sections = document.querySelectorAll('.hero, .services, .colleges, .courses, .about, .contact');
  const trigger = window.innerHeight * 0.92;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add loading animation for images
function initImageLoading() {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
}

// Initialize image loading
initImageLoading()

// Add error handling for failed image loads
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "/placeholder.svg?height=300&width=400&text=Image+Not+Found"
    }
  },
  true,
)

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}
