document.addEventListener("DOMContentLoaded", function () {
    console.log("System Online: Portfolio Loaded");

    // --- Typewriter Effect for Hero Section ---
    const textElement = document.getElementById("typewriter-text");
    const roles = [
        "Cybersecurity Engineer...",
        "SOC Analyst...",
        "n8n Automation Specialist...",
        "Network Security."  // <--- Updated Text
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            textElement.innerHTML = currentRole.substring(0, charIndex--) + '<span class="cursor">|</span>';
        } else {
            textElement.innerHTML = currentRole.substring(0, charIndex++) + '<span class="cursor">|</span>';
        }

        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    if(textElement) typeEffect();

    // --- Scroll Fade-In Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));

    // --- 🔄 FIXED DRAG TO SCROLL LOGIC ---
    const slider = document.querySelector('.project-container');
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false; // Flag to distinguish drag vs click

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false; // Reset drag status
            slider.classList.add('active'); // Change cursor
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            
            // Short timeout to allow click event to check drag status
            setTimeout(() => { isDragging = false; }, 50); 
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Stop default text selection behavior
            
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll multiplier
            
            // If moved more than 5px, consider it a drag
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            
            slider.scrollLeft = scrollLeft - walk;
        });

        // Add Click Listeners to Cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                // If we were dragging, STOP the link from opening
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    // If not dragging, go to the link
                    const link = this.getAttribute('data-link');
                    if (link && link !== '#') {
                        window.location.href = link;
                    }
                }
            });
        });
    }
});