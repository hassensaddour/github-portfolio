document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded!");

    // Section fade-in logic
    const sections = document.querySelectorAll('.section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // 🔄 Drag-to-scroll logic for horizontal project container
    const slider = document.querySelector('.project-container');
    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let dragThreshold = 5;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.classList.add('dragging');
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');

            // Delay resetting drag status to ensure click handler checks it
            setTimeout(() => {
                isDragging = false;
            }, 0);
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;

            if (Math.abs(walk) > dragThreshold) {
                isDragging = true;
            }

            e.preventDefault();
            slider.scrollLeft = scrollLeft - walk;
        });

        // Prevent clicks after dragging
        const cards = slider.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('click', function (e) {
                if (isDragging) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        });
    }
});
