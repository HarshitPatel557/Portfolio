/**
 * JavaScript Functionality - script.js
 * 1. Dark Mode Toggle
 * 2. Smooth Scroll for Navigation
 * 3. Update Current Year in Footer
 * 4. Basic Contact Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const isDarkMode = localStorage.getItem('dark-mode') === 'true' || 
                       (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('dark-mode') === null);

    if (isDarkMode) {
        body.classList.add('dark-mode');
        // Update button icon (initial state)
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isCurrentlyDarkMode = body.classList.contains('dark-mode');
        
        // Save preference to local storage
        localStorage.setItem('dark-mode', isCurrentlyDarkMode);

        // Toggle icon
        if (isCurrentlyDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });


    // --- 2. Smooth Scroll for Navigation ---
    document.querySelectorAll('nav a[href^="#"], .cta-group a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                 // Scroll to the element, accounting for the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 4. Basic Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server/email service (e.g., Netlify Forms, Formspree, or your own backend)
            console.log('Form Submitted!'); 
            
            // Display success message
            formMessage.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.style.color = 'var(--color-accent)';

            // Clear the form after a short delay (optional)
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});