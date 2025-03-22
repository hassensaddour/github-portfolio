document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded!");

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
});
