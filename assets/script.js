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
    let startX;
    let scrollLeft;

if (slider) {
    let isDragging = false;
    let dragStartX = 0;
    let dragThreshold = 5;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        dragStartX = e.pageX;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', (e) => {
        isDown = false;
        slider.classList.remove('dragging');
        const dragDistance = Math.abs(e.pageX - dragStartX);
        isDragging = dragDistance > dragThreshold;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Prevent click if it was a drag
    const cards = slider.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (isDragging) {
                e.preventDefault();
                e.stopImmediatePropagation();
                isDragging = false; // reset
            }
        });
    });
}

