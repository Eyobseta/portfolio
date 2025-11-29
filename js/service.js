document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize Swiper and point navigation to our external buttons
  const mySwiper = new Swiper('.my-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,

    // External navigation buttons
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Optional: keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Optional: responsive breakpoints
    breakpoints: {
      900: {
        spaceBetween: 24,
      }
    }
  });

  // Disable prev/next while swiper is transitioning (prevent spam)
  mySwiper.on('slideChangeTransitionStart', () => {
    document.querySelector('.custom-prev').disabled = true;
    document.querySelector('.custom-next').disabled = true;
  });

  mySwiper.on('slideChangeTransitionEnd', () => {
    document.querySelector('.custom-prev').disabled = false;
    document.querySelector('.custom-next').disabled = false;
  });

});
