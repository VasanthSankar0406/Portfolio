document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed/sticky header
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const offsetTop = targetElement.offsetTop - navHeight; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active class immediately for a snappier feel
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Scroll-to-Top Button functionality
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.classList.add('show'); // Add 'show' class to trigger CSS fade-in
        } else {
            scrollToTopBtn.classList.remove('show'); // Remove 'show' class to trigger CSS fade-out
        }

        // Highlight active navigation link on scroll
        highlightNavLink();
    };

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        // Remove active class from all nav links when scrolling to top
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    });

    // Function to highlight the active navigation link based on scroll position
    function highlightNavLink() {
        const sections = document.querySelectorAll('.section-content');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const navHeight = document.querySelector('.sticky-nav').offsetHeight;

        let currentSectionId = '';

        sections.forEach(section => {
            // Adjust section top to account for sticky nav and a small buffer
            const sectionTop = section.offsetTop - navHeight - 10; 
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });

        // Special handling for the very top (hero section)
        if (window.scrollY < document.getElementById('about').offsetTop - navHeight) {
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        }
    }

    // --- Intersection Observer for Scroll Animations ---
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;

                setTimeout(() => {
                    element.classList.add('is-visible');
                }, delay);

                observer.unobserve(element); // Stop observing once animated
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Initial call to highlightNavLink in case page is loaded not at the very top
    highlightNavLink();
});
