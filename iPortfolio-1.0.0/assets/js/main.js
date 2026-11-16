/**
* Template Name: iPortfolio
* Personal Portfolio: Preethi Boddu
* Stack: Python Full Stack Developer
*/

(function() {
  "use strict";

  /**
   * Safe event binder that runs immediately if already loaded
   */
  function onPageLoad(fn) {
    if (document.readyState === 'complete') {
      fn();
    } else {
      window.addEventListener('load', fn);
    }
  }

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Preloader removal (with failsafe)
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const removePreloader = () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 300);
    };

    onPageLoad(removePreloader);
    // Failsafe timeout so screen is never blocked
    setTimeout(removePreloader, 1000);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  onPageLoad(toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  onPageLoad(aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 90,
        backSpeed: 45,
        backDelay: 2000
      });
    }
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let configEl = swiperElement.querySelector(".swiper-config");
        if (configEl) {
          let config = JSON.parse(configEl.innerHTML.trim());
          new Swiper(swiperElement, config);
        }
      });
    }
  }
  onPageLoad(initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  function handleHashScroll() {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
          window.scrollTo({
            top: section.offsetTop - scrollMarginTop,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }
  onPageLoad(handleHashScroll);

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  onPageLoad(navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
