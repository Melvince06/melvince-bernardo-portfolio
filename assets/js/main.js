/* =====================================================
   Resume section tabs and tab contents
===================================================== */
const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick){
   resumeTabContents.forEach((resumeTabContents) => {
      resumeTabContents.style.display = "none";
      resumeTabContents.classList.remove("active");
            
   });

   resumePortfolioTabBtns.forEach((resumePortfolioTabBtns) => {
      resumePortfolioTabBtns.classList.remove("active");
   });

   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() =>{
      resumeTabContents[resumeTabClick].classList.add("active");
   }, 100);
   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
   
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtns, i) => {
   resumePortfolioTabBtns.addEventListener("click", () => {
      resumeTabNav(i);
   });
});
/* =====================================================
   Service modal open/close function
===================================================== */
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModals) => {
   const serviceCard = serviceCardWithModals.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModals.querySelector(".service-modal-backdrop");  
   const modalCloseBtn = serviceCardWithModals.querySelector(".modal-close-btn"); 
   const serviceModal = serviceCardWithModals.querySelector(".service-modal"); 
   
   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";

      setTimeout(() => {
         serviceBackDrop.classList.add("active");
      }, 100);
      
      setTimeout(() => {
         serviceModal.classList.add("active");
      }, 300);
      
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         serviceBackDrop.style.display = "none";
      }, 500);

      setTimeout(() => {
         serviceBackDrop.classList.remove("active");  
         serviceModal.classList.remove("active");
      }, 100);
   });

});

/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */

// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {

   /* ==========================================
      PORTFOLIO TABS (Filter)
   ========================================== */
   const portfolioTabs = document.querySelector(".portfolio-tabs");
   const portfolioTabsBtns = portfolioTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

   portfolioTabsBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");

         cardsWithModals.forEach((cardWithModal) => {
            if (filter === "all" || cardWithModal.classList.contains(filter)) {
               cardWithModal.classList.remove("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            } else {
               cardWithModal.classList.add("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "0";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
         });

         // Active tab
         portfolioTabsBtns.forEach((btn) => btn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });

   /* ==========================================
      PORTFOLIO MODALS + SWIPER
   ========================================== */

   let activeModalSwiper = null; // store swiper instance

   function initModalSwiper(modal) {
      const swiperContainer = modal.querySelector(".modal-swiper");
      if (!swiperContainer) return;

      // destroy previous swiper if open
      if (activeModalSwiper) {
         activeModalSwiper.destroy();
         activeModalSwiper = null;
      }

      // create new swiper
      activeModalSwiper = new Swiper(swiperContainer, {
         loop: true,
         pagination: {
            el: modal.querySelector(".swiper-pagination"),
            clickable: true,
         },
         navigation: {
            nextEl: modal.querySelector(".swiper-button-next"),
            prevEl: modal.querySelector(".swiper-button-prev"),
         },
      });
   }

   const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

   portfolioCardsWithModals.forEach((item) => {
      const portfolioCard = item.querySelector(".portfolio-card");
      const portfolioBackdrop = item.querySelector(".portfolio-modal-backdrop");
      const modalCloseBtn = item.querySelector(".modal-close-btn");
      const portfolioModal = item.querySelector(".portfolio-modal");

      /* --- OPEN MODAL --- */
      portfolioCard.addEventListener("click", () => {
         portfolioBackdrop.style.display = "flex";

         setTimeout(() => {
            portfolioBackdrop.classList.add("active");
            portfolioModal.classList.add("active");
         }, 300);

         // initialize swiper AFTER modal becomes visible
         setTimeout(() => initModalSwiper(portfolioModal), 350);
      });

      /* --- CLOSE MODAL --- */
      modalCloseBtn.addEventListener("click", () => {
         setTimeout(() => {
            portfolioBackdrop.style.display = "none";
         }, 500);

         setTimeout(() => {
            portfolioBackdrop.classList.remove("active");
            portfolioModal.classList.remove("active");
         }, 100);

         // destroy swiper instance
         if (activeModalSwiper) {
            activeModalSwiper.destroy();
            activeModalSwiper = null;
         }
      });
   });

});

/* =====================================================
   Testimonial Swiper
===================================================== */

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function() {
   // https://dashboard.emailjs.com/admin/account
   emailjs.init({
      publicKey: "fkClrGOrKvlEWUsO6",
   });
})();

const melContactForm = document.getElementById("mel-contact-form");
const melContactFormAlert = document.querySelector(".contact-form-alert");
const submitBtn = document.querySelector(".submit-btn");

melContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // START LOADING
  submitBtn.classList.add("loading");

  emailjs.sendForm(
    "service_g1wblxl",
    "template_rjq612f",
    "#mel-contact-form"
  )
  .then(() => {
    melContactFormAlert.innerHTML =
      "<span>Your Message Sent Successfully!</span> <i class='ri-checkbox-circle-fill'></i>";

    melContactForm.reset();
  })
  .catch((error) => {
    melContactFormAlert.innerHTML =
      "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
    melContactFormAlert.title = error;
  })
  .finally(() => {
    // STOP LOADING
    submitBtn.classList.remove("loading");

    setTimeout(() => {
      melContactFormAlert.innerHTML = "";
    }, 4000);
  });
});


/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
   const melHeader = document.querySelector(".mel-header");

   melHeader.classList.toggle("shink", window.scrollY > 0);
});

/* =====================================================
   Bottom navigation menu
===================================================== */
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSections) => {
      let sectionHeight = navMenuSections.offsetHeight;
      let sectionTop = navMenuSections.offsetTop - 50;
      let id = navMenuSections.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");
      }
   });
});

// Each bottom navigation menu items active on page scroll.

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active", window.scrollY < 10);
});
// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
   bottomNav.classList.add("active");
   menuShowBtn.classList.remove("active");

   if(window.scrollY < 10){
      menuHideBtn.classList.remove("active");

      function scrollStopped(){
         bottomNav.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }

   if(window.scrollY > 10){
      menuHideBtn.classList.add("active");

      function scrollStopped(){
         bottomNav.classList.remove("active");
         menuShowBtn.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }
});

// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});

// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.add("active");
   menuShowBtn.classList.toggle("active");
});

/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () => {
   const toTopBtn = document.querySelector(".to-top-btn");

   toTopBtn.classList.toggle("active", window.scrollY > 0);

   //scroll indicator bar
   const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

   const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

   const scrollValue = (pageScroll / height) * 100;

   scrollIndicatorBar.style.height = scrollValue + "%";
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
   let x = e.clientX;
   let y = e.clientY;

   cursorDot.style.top = y + "px";
   cursorDot.style.left = x + "px";
   cursorCircle.style.top = y + "px";
   cursorCircle.style.left = x + "px";
   
});
// Cursor effects on hover website elements.
const cursorHoverLinks = document.querySelectorAll("body a, .theme-btn, .mel-main-btn, .portfolio-card, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn");

cursorHoverLinks.forEach((cursorHoverLink) => {
   cursorHoverLink.addEventListener("mouseover", () => {
      cursorDot.classList.add("large");
      cursorCircle.style.display = "none";
   });
})

cursorHoverLinks.forEach((cursorHoverLink) => {
   cursorHoverLink.addEventListener("mouseout", () => {
      cursorDot.classList.remove("large");
      cursorCircle.style.display = "block";
   });
})
/* =====================================================
   Website dark/light theme
===================================================== */
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   //change theme icon and theme on click theme button
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   //save theme icon and theme on click theme button,
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("mel-saved-icon", getCurrentIcon());
   localStorage.setItem("mel-saved-theme", getCurrentTheme());
});
// Change theme and save current theme on click the theme button.

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("mel-saved-icon");
const savedTheme = localStorage.getItem("mel-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.
ScrollReveal({
  //reset: true, 
  distance: '60px',
  duration: 2500,
  delay: 400
});

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top' });
ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.about-img', { delay: 700, origin: 'top' });
ScrollReveal().reveal('.about-info, .mel-footer, .mel-logo', { delay: 300, origin: 'bottom' });
ScrollReveal().reveal('.pro-card, .about-buttons, .mel-main-btn, .resume-tabs, .tab-btn, .portfolio-tabs, .tab-btn', { delay: 500, origin: 'right', interval: 200 });
ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.service-card, .portfolio-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom', interval: 300 });
ScrollReveal().reveal('.contact-form-body', { delay: 700, origin: 'right' });
ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 300 });


document.querySelectorAll('.card-actions a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.stopPropagation(); // ❗ pigilan ang modal
  });
});

