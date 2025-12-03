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

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const step = dot.dataset.step;

            dots.forEach(d => d.classList.remove("active"));
            dot.classList.add("active");

            panels.forEach(panel => {
                panel.classList.toggle("active", panel.dataset.step === step);
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("journeyModal");
    const section = document.querySelector(".journey");
    
    if (!modal || !section) return;
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
});


