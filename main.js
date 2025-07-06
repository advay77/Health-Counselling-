document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Sticky Header
  const header = document.getElementById("header")
  const ticker = document.querySelector(".ticker-wrap")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.padding = "10px 0"
      ticker.style.top = "60px"
    } else {
      header.style.padding = "15px 0"
      ticker.style.top = "70px"
    }
  })

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Tabs Functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all buttons and panes
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to current button and pane
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Accordion Functionality
  const accordionItems = document.querySelectorAll(".accordion-item")

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header")

    header.addEventListener("click", () => {
      // Accordion click for desktop and mobile
      handleAccordion(item);
    });
    // Also support touchstart for mobile
    header.addEventListener("touchstart", (e) => {
      // Prevents duplicate firing on some devices
      e.preventDefault();
      handleAccordion(item);
    });
    function handleAccordion(currentItem) {
      // Close all other accordion items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== currentItem) {
          otherItem.classList.remove("active");
        }
      });
      // Toggle current accordion item
      currentItem.classList.toggle("active");
    }
  })

  // Testimonial Slider
  const testimonialTrack = document.getElementById("testimonial-track")
  const prevBtn = document.getElementById("prev-testimonial")
  const nextBtn = document.getElementById("next-testimonial")
  let currentSlide = 0
  const testimonials = document.querySelectorAll(".testimonial-card")

  if (testimonialTrack && testimonials.length > 0) {
    // Set initial position
    updateSliderPosition()

    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length
        updateSliderPosition()
      })
    }

    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % testimonials.length
        updateSliderPosition()
      })
    }

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonials.length
      updateSliderPosition()
    }, 5000)
  }

  function updateSliderPosition() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`
  }




})

document.addEventListener("DOMContentLoaded", () => {
  // Sample college data
  const colleges = [
    {
      id: 1,
      name: "All India Institute of Medical Sciences (AIIMS)",
      location: "New Delhi",
      state: "delhi",
      type: "government",
      courses: ["mbbs", "md", "ms"],
      fees: "low",
      rating: 4.9,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4COmvB4sz3CEqGkrS3sMDtnMic43m32lmg&s",
      description: "Premier medical institution in India known for excellence in medical education and research.",
    },
    {
      id: 2,
      name: "Christian Medical College (CMC)",
      location: "Vellore, Tamil Nadu",
      state: "tamilnadu",
      type: "private",
      courses: ["mbbs", "md", "ms"],
      fees: "medium",
      rating: 4.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/CMCH_Vellore.JPG",
      description: "One of the top medical colleges known for quality education and patient care.",
    },
    {
      id: 3,
      name: "King George's Medical University",
      location: "Lucknow, Uttar Pradesh",
      state: "uttar pradesh",
      type: "government",
      courses: ["mbbs", "bds", "md", "ms", "mds"],
      fees: "low",
      rating: 4.7,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSVyWNgImddpQnCr-yZB4nbTJ5Bgw7rI1Lmw&s",
      description: "Historic medical institution offering a wide range of medical courses.",
    },
    {
      id: 4,
      name: "Kasturba Medical College",
      location: "Manipal, Karnataka",
      state: "karnataka",
      type: "private",
      courses: ["mbbs", "md", "ms"],
      fees: "high",
      rating: 4.6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSywy15T2MmyedPZ4bqsKyUtEHBn3q6t3aKlw&s",
      description: "Leading private medical college with state-of-the-art facilities.",
    },
    {
      id: 5,
      name: "Grant Medical College",
      location: "Mumbai, Maharashtra",
      state: "maharashtra",
      type: "government",
      courses: ["mbbs", "md", "ms"],
      fees: "low",
      rating: 4.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XlbCiaA8irimB6p39PKu9ENEe9XWY_2R_Q&s",
      description: "One of the oldest medical colleges in India with a rich heritage.",
    },
    {
      id: 6,
      name: "St. John's Medical College",
      location: "Bangalore, Karnataka",
      state: "karnataka",
      type: "private",
      courses: ["mbbs", "md", "ms"],
      fees: "medium",
      rating: 4.5,
      image: "https://i.ytimg.com/vi/xLuV0cPEPy4/sddefault.jpg?v=61192c04",
      description: "Christian minority institution known for holistic medical education.",
    },
    {
      id: 7,
      name: "Maulana Azad Medical College",
      location: "New Delhi",
      state: "delhi",
      type: "government",
      courses: ["mbbs", "md", "ms"],
      fees: "low",
      rating: 4.6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwlzxbm17hrvjmP64uBzzf2JnaGSm8CsKVaQ&s",
      description: "Premier medical college in the heart of Delhi with excellent clinical exposure.",
    },
    {
      id: 8,
      name: "KLE University's J. N. Medical College",
      location: "Belgaum, Karnataka",
      state: "karnataka",
      type: "private",
      courses: ["mbbs", "md", "ms"],
      fees: "high",
      rating: 4.3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6RQNtDGTd0IFNiDGuFkRHlMTVHy35eM0Rw&s",
      description: "Well-established medical college with modern infrastructure.",
    },
    {
      id: 9,
      name: "Government Medical College",
      location: "Chennai, Tamil Nadu",
      state: "tamilnadu",
      type: "government",
      courses: ["mbbs", "md", "ms"],
      fees: "low",
      rating: 4.4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMwG5wZxBan014l_FGvG3Nrmr3ViY_zuyWg&s",
      description: "Prestigious government medical college with excellent faculty.",
    },
  ]

  const collegesGrid = document.getElementById("colleges-grid")
  const courseFilter = document.getElementById("course-filter")
  const stateFilter = document.getElementById("state-filter")
  const feeFilter = document.getElementById("fee-filter")
  const typeFilter = document.getElementById("type-filter")
  const loadMoreBtn = document.getElementById("load-more-btn")

  const currentFilters = {
    course: "all",
    state: "all",
    fee: "all",
    type: "all",
  }

  let visibleColleges = 6

  // Initial render
  renderColleges()

  // Filter change event listeners
  if (courseFilter) {
    courseFilter.addEventListener("change", function () {
      currentFilters.course = this.value
      visibleColleges = 6
      renderColleges()
    })
  }

  if (stateFilter) {
    stateFilter.addEventListener("change", function () {
      currentFilters.state = this.value
      visibleColleges = 6
      renderColleges()
    })
  }

  if (feeFilter) {
    feeFilter.addEventListener("change", function () {
      currentFilters.fee = this.value
      visibleColleges = 6
      renderColleges()
    })
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", function () {
      currentFilters.type = this.value
      visibleColleges = 6
      renderColleges()
    })
  }

  // Load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleColleges += 3
      renderColleges()
    })
  }

  function renderColleges() {
    if (!collegesGrid) return

    // Filter colleges based on current filters
    const filteredColleges = colleges.filter((college) => {
      return (
        (currentFilters.course === "all" || college.courses.includes(currentFilters.course)) &&
        (currentFilters.state === "all" || college.state === currentFilters.state) &&
        (currentFilters.fee === "all" || college.fees === currentFilters.fee) &&
        (currentFilters.type === "all" || college.type === currentFilters.type)
      )
    })

    // Clear current colleges
    collegesGrid.innerHTML = ""

    // Show message if no colleges match filters
    if (filteredColleges.length === 0) {
      collegesGrid.innerHTML =
        '<div class="no-results">No colleges match your selected filters. Please try different criteria.</div>'
      loadMoreBtn.style.display = "none"
      return
    }

    // Render visible colleges
    const collegesToShow = filteredColleges.slice(0, visibleColleges)

    collegesToShow.forEach((college) => {
      const collegeCard = document.createElement("div")
      collegeCard.className = "college-card"

      // Generate stars based on rating
      let stars = ""
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(college.rating)) {
          stars += '<i class="fas fa-star"></i>'
        } else if (i - 0.5 <= college.rating) {
          stars += '<i class="fas fa-star-half-alt"></i>'
        } else {
          stars += '<i class="far fa-star"></i>'
        }
      }

      // Format fee range
      let feeRange = ""
      if (college.fees === "low") {
        feeRange = "₹10,000 - ₹1,00,000 per year"
      } else if (college.fees === "medium") {
        feeRange = "₹1,00,000 - ₹10,00,000 per year"
      } else {
        feeRange = "₹10,00,000+ per year"
      }

      // Format college type
      const collegeType = college.type === "government" ? "Government" : "Private"

      collegeCard.innerHTML = `
                <div class="college-image">
                    <img src="${college.image}" alt="${college.name}">
                </div>
                <div class="college-details">
                    <h3>${college.name}</h3>
                    <div class="college-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${college.location}</span>
                        <span><i class="fas fa-university"></i> ${collegeType}</span>
                    </div>
                    <div class="college-rating">
                        <div class="stars">${stars}</div>
                        <span>${college.rating}/5</span>
                    </div>
                    <p>${college.description}</p>
                    <div class="college-meta">
                        <span><i class="fas fa-rupee-sign"></i> ${feeRange}</span>
                    </div>
                    <div class="college-actions">
                        <a href="#contact" class="btn-primary">Get Details</a>
                    </div>
                </div>
            `

      collegesGrid.appendChild(collegeCard)
    })

    // Show/hide load more button
    if (filteredColleges.length > visibleColleges) {
      loadMoreBtn.style.display = "inline-block"
    } else {
      loadMoreBtn.style.display = "none"
    }
  }
})
