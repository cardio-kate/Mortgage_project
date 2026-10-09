import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuBlock = document.querySelector('.menu__block');
const menuOverlay = document.querySelector('.menu__overlay');
const closeElem = document.querySelector('.menu__close-touch');
const menuLinks = document.querySelectorAll('.menu__link');

if (!hamburger || !menu || !menuBlock) return;

function getFocusable() {
    return Array.from(
        menuBlock.querySelectorAll('a[href], button:not([disabled])')
    );
}

function openMenu() {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');

    // wait until menu becomes visible, otherwise focus doesn't work
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const focusable = getFocusable();
            if (focusable.length) focusable[0].focus();
        });
    });
}

function closeMenu() {
    menu.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
}

hamburger.addEventListener('click', openMenu);

if (closeElem) {
    closeElem.addEventListener('click', closeMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeMenu();
        return;
    }

    if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

    const dots = document.querySelectorAll(".journey__dot");
    const panels = document.querySelectorAll(".journey__panel");

    function activateStep(step) {
        dots.forEach(dot => {
            const isActive = dot.dataset.step === step;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "step" : "false");
        });
        panels.forEach(panel => {
            const isActive = panel.dataset.step === step;
            panel.classList.toggle("active", isActive);
            panel.setAttribute("aria-current", isActive ? "step" : "false");
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

        panel.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activateStep(panel.dataset.step);
            }
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

    if (!btnLeft || !btnRight) return;

    let pageIndex = 0;
    let dotIndex = 0;  

    const formatNumber = (num) => String(num).padStart(2, '0');

    function updateUI() {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === pageIndex);
        });

        pagDots.forEach((dot, i) => {
            const isActive = i === dotIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
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


