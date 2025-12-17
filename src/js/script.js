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

    const pages = document.querySelectorAll('.reviews__page-left');
    const pagDots = document.querySelectorAll('.reviews__dot'); 
    const btnLeft = document.querySelector('.reviews__btn-left');
    const btnRight = document.querySelector('.reviews__btn-right');
    const currentNumber = document.querySelector('.reviews__number-current');

    let pageIndex = 0; 
    let dotIndex = 0;  

    const formatNumber = (num) => String(num).padStart(2, '0');

    function updateUI() {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === pageIndex);
        });

        pagDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });

        if (currentNumber) {
            currentNumber.textContent = formatNumber(dotIndex + 1);
        }
    }

    btnRight.addEventListener('click', (e) => {
        e.preventDefault();

        dotIndex = (dotIndex + 1) % pagDots.length;
        if (pages.length > 1) pageIndex = dotIndex % pages.length;

        updateUI();
    });

    btnLeft.addEventListener('click', (e) => {
        e.preventDefault();

        dotIndex = (dotIndex - 1 + pagDots.length) % pagDots.length;
        if (pages.length > 1) pageIndex = dotIndex % pages.length;

        updateUI();
    });

    pagDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dotIndex = index;
            if (pages.length > 1) pageIndex = index;

            updateUI();
        });
    });

    updateUI();

});
