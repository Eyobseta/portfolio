document.addEventListener("DOMContentLoaded", () => {
    
    // =======================================================================
    // 0. ANIMATION ON LOAD / SCROLL (AOS)
    // =======================================================================

    // Words for the Typewriter Effect. These will now contain the full phrases
    // that will replace the content of the <span id="typed-text">
    const WORDS = [
        "Creative Full-Stack Developer", 
        "Innovative Frontend Specialist", 
        "Reliable Backend Engineer"
    ];
    let wordIndex = 0;
    let isTyping = false; // Flag to prevent multiple typing loops from starting

    // Function to handle the Hero section fade-in on load
    function animateHero() {
        // Find hero elements for standard fade-in (excluding the typing title)
        const heroElements = document.querySelectorAll('.hero-tagline, .hero-description, .hero-buttons');
        
        // Loop through and apply the 'in-view' effect after a staggered delay
        heroElements.forEach((el, index) => {
            // Start delays after the tagline has been displayed (index 0)
            const delay = 500 + (index * 200); 
            setTimeout(() => {
                // By changing opacity/transform, the CSS transitions take over
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
        });

        // Start the continuous typewriter effect
        startTypingLoop();
    }
    
    // Function to start the continuous typing loop
    function startTypingLoop() {
        if (isTyping) return; // Prevent starting the loop multiple times
        isTyping = true;
        
        const typedTextElement = document.getElementById('typed-text');
        if (typedTextElement) {
            typedTextElement.style.opacity = '1';
            // Ensure the cursor is visible by manipulating the border style
            typedTextElement.style.borderRight = '2px solid var(--primary-color)'; 
        }

        // Start the loop after a short initial delay
        setTimeout(typeNextWord, 500);
    }
    
    // Core logic for the Typing, Disappearing, and Looping Animation
    function typeNextWord() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) {
            isTyping = false;
            return;
        }

        // Ensure the element is visible before typing starts
        typedTextElement.style.visibility = 'visible';
        
        const currentPhrase = WORDS[wordIndex];
        let charIndex = 0;
        const typingSpeed = 100; // Speed of typing each character
        const pauseTime = 10000; // 10 seconds pause as requested

        // 1. TYPING FUNCTION
        function type() {
            if (charIndex < currentPhrase.length) {
                // We are typing the full phrase into the span
                typedTextElement.textContent += currentPhrase.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Typing complete, wait 10 seconds before instant disappearance
                setTimeout(instantClear, pauseTime);
            }
        }

        // 2. INSTANT CLEAR FUNCTION
        function instantClear() {
            // Instantly clear the text content
            typedTextElement.textContent = ""; 
            // Hide the cursor by setting border width to 0 during the pause
            typedTextElement.style.borderRightWidth = '0'; 
            
            // Move to the next word index and restart the process after a brief moment
            wordIndex = (wordIndex + 1) % WORDS.length;
            
            // Short delay (500ms) before the next phrase starts typing
            setTimeout(typeNextWord, 500);
            
            // Note: We don't need to explicitly set display: none,
            // as clearing textContent and removing the cursor is enough to make it disappear
            // for the user, and keeps the flow simple.
            typedTextElement.style.borderRightWidth = '2px'; // Restore cursor for typing next word
        }

        // Start the typing process for the current word
        type();
    }


    // Intersection Observer for Animate-on-Scroll (AOS) on other sections
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'in-view' class when the element enters the viewport
                entry.target.classList.add('in-view');
                // Stop observing once the animation has been triggered
                // NOTE: We do NOT stop observing the Home section (handled by homeObserver)
                if (entry.target.id !== 'home') {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        // Trigger when 20% of the element is visible
        threshold: 0.2 
    });
    
    // Intersection Observer specific to the Home section for re-triggering the typing effect
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the home section is visible AND the typing loop is currently inactive
            if (entry.isIntersecting && !isTyping) {
                startTypingLoop();
            }
        });
    }, {
        // Trigger when the section is fully visible
        threshold: 0.5 
    });


    // Elements to observe for Animate-on-Scroll 
    document.querySelectorAll('section').forEach(section => {
        // Assign specific classes for different animation effects defined in CSS
        if (section.id === 'about' || section.id === 'contact') {
             section.classList.add('fade-up');
        } 
        
        // Use the general observer for all sections except home initially
        if (section.id !== 'home') {
             observer.observe(section);
        } else {
             // Observe the home section separately to handle the re-typing request
             homeObserver.observe(section);
        }
    });

    // Run the hero animation (which includes starting the typing loop) immediately after the page loads
    animateHero();


    // =======================================================================
    // 1. MOBILE MENU TOGGLE (FIXED)
    // =======================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        // Toggle the 'open' class on the mobile menu
        mobileMenu.classList.toggle('open'); 
        
        // Toggle the icon between bars (menu) and times (close)
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.querySelector('i').classList.remove('fa-xmark');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // =======================================================================
    // 2. ABOUT SECTION TABS (FIXED)
    // =======================================================================

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target content ID based on the button's ID prefix
            // e.g., 'expBtn' -> 'experience'
            const targetId = button.id.replace('Btn', '');
            const targetContent = document.getElementById(targetId);

            // 1. Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            
            // 2. Hide all content panels
            tabContents.forEach(content => content.classList.remove('active-content'));

            // 3. Activate clicked button
            button.classList.add('active-tab');

            // 4. Show target content panel
            if (targetContent) {
                targetContent.classList.add('active-content');
            }
        });
    });

    // =======================================================================
    // 3. SKILLS SECTION SWIPER 
    // =======================================================================

    const mySwiper = new Swiper('.my-swiper', {
        slidesPerView: 1.2, 
        centeredSlides: true,
        loop: true,
        spaceBetween: 20,

        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            768: { 
                slidesPerView: 2.2,
                spaceBetween: 24,
                loop: false, 
                centeredSlides: false,
            },
            1024: { 
                slidesPerView: 3,
                spaceBetween: 30,
                loop: false,
                centeredSlides: false,
            }
        }
    });

    // Disable navigation buttons during transition
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    if (prevButton && nextButton) {
        mySwiper.on('slideChangeTransitionStart', () => {
            prevButton.disabled = true;
            nextButton.disabled = true;
        });

        mySwiper.on('slideChangeTransitionEnd', () => {
            prevButton.disabled = false;
            nextButton.disabled = false;
        });
    }

    // =======================================================================
    // 4. ACTIVE NAVIGATION LINK SCROLL LISTENER (for highlighting links)
    // =======================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    function activateLink() {
        let current = '';

        sections.forEach(section => {
            // Use 100px buffer to highlight the link slightly before the section hits the top
            const sectionTop = section.offsetTop - 100; 
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        const allLinks = [...navLinks, ...mobileLinks];

        allLinks.forEach(a => {
            a.classList.remove('active');
            // Check if the link href contains the current section ID (e.g., "#home" contains "home")
            if (a.getAttribute('href')?.includes(current)) {
                a.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateLink);
    activateLink(); // Run on load to set initial active link
});

