import "/src/sass/style.scss";


const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close-touch');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", () => {

    const dots = document.querySelectorAll(".journey__dot");
    const panels = document.querySelectorAll(".journey__panel");

    function activateStep(step) {
        dots.forEach(dot => {
            dot.classList.toggle("active", dot.dataset.step === step);
        });
        panels.forEach(panel => {
            panel.classList.toggle("active", panel.dataset.step === step);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            activateStep(dot.dataset.step);
        });
    });

    panels.forEach(panel => {
        panel.addEventListener("click", () => {
            activateStep(panel.dataset.step);
        });
    });

    const modal = document.getElementById("journeyModal");
    const section = document.querySelector(".journey");

    if (modal && section) {
        let shown = false;

        function checkVisibility() {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;
            const scrolled = windowHeight - rect.top;
            const progress = scrolled / sectionHeight;

            if (progress > 0.7 && !shown) {
                modal.classList.add("show");
                shown = true;
            }
        }

        window.addEventListener("scroll", checkVisibility);
    }

});






