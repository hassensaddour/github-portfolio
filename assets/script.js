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
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging'); // ⬅️ Add this line
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging'); // ⬅️ Add this line
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging'); // ⬅️ Add this line
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
}
});
