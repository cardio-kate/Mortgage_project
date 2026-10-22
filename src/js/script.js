import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
    const subscribeForms = document.querySelectorAll(".about__subscribe, .webinar__subscribe");

    subscribeForms.forEach((form) => {
        const message = form.querySelector('[role="status"]');
        let hideTimer;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            form.reset();
            message.textContent = "Thanks! Check your inbox.";
            message.classList.add("active");

            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                message.classList.remove("active");
            }, 4000);
        });
    });

    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const menuBlock = document.querySelector(".menu__block");
    const menuOverlay = document.querySelector(".menu__overlay");
    const closeElem = document.querySelector(".menu__close-touch");
    const menuLinks = document.querySelectorAll(".menu__link");

    if (!hamburger || !menu || !menuBlock) return;

    function getFocusable() {
        return Array.from(menuBlock.querySelectorAll("a[href], button:not([disabled])"));
    }

    // focus doesn't work until the menu's visibility transition ends
    function focusFirstItem(e) {
        if (e.target !== menu || e.propertyName !== "visibility") return;
        menu.removeEventListener("transitionend", focusFirstItem);

        const focusable = getFocusable();
        if (focusable.length) focusable[0].focus();
    }

    function openMenu() {
        menu.classList.add("active");
        document.body.style.overflow = "hidden";
        hamburger.setAttribute("aria-expanded", "true");
        menu.addEventListener("transitionend", focusFirstItem);
    }

    function closeMenu() {
        menu.removeEventListener("transitionend", focusFirstItem);
        menu.classList.remove("active");
        document.body.style.overflow = "";
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.focus();
    }

    hamburger.addEventListener("click", openMenu);

    if (closeElem) {
        closeElem.addEventListener("click", closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (!menu.classList.contains("active")) return;

        if (e.key === "Escape") {
            closeMenu();
            return;
        }

        if (e.key === "Tab") {
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
        dots.forEach((dot) => {
            const isActive = dot.dataset.step === step;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "step" : "false");
        });
        panels.forEach((panel) => {
            const isActive = panel.dataset.step === step;
            panel.classList.toggle("active", isActive);
            panel.setAttribute("aria-current", isActive ? "step" : "false");
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            activateStep(dot.dataset.step);
        });
    });

    panels.forEach((panel) => {
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
        const modalClose = modal.querySelector(".journey__modal-close");

        function checkVisibility() {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;
            const scrolled = windowHeight - rect.top;
            const progress = scrolled / sectionHeight;

            if (progress > 0.7) {
                modal.show();
                window.removeEventListener("scroll", checkVisibility);
            }
        }

        window.addEventListener("scroll", checkVisibility);

        if (modalClose) {
            modalClose.addEventListener("click", () => modal.close());
        }

        // non-modal dialogs don't close on Escape by default
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.open) modal.close();
        });
    }

    const pages = document.querySelectorAll(".reviews__page-item");
    const pagDots = document.querySelectorAll(".reviews__dot");
    const btnLeft = document.querySelector(".reviews__btn-left");
    const btnRight = document.querySelector(".reviews__btn-right");
    const currentNumber = document.querySelector(".reviews__number-current");

    if (!btnLeft || !btnRight) return;

    let pageIndex = 0;

    const formatNumber = (num) => String(num).padStart(2, "0");

    function updateUI() {
        const nextIndex = (pageIndex + 1) % pages.length;

        pages.forEach((page, i) => {
            page.classList.toggle("active", i === pageIndex);
            page.classList.toggle("next", i === nextIndex);
        });

        pagDots.forEach((dot, i) => {
            const isActive = i === pageIndex;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        if (currentNumber) {
            currentNumber.textContent = formatNumber(pageIndex + 1);
        }
    }

    btnRight.addEventListener("click", (e) => {
        e.preventDefault();

        pageIndex = (pageIndex + 1) % pages.length;

        updateUI();
    });

    btnLeft.addEventListener("click", (e) => {
        e.preventDefault();

        pageIndex = (pageIndex - 1 + pages.length) % pages.length;

        updateUI();
    });

    pagDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            pageIndex = index;

            updateUI();
        });
    });

    updateUI();
});
