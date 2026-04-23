document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const content = lightbox.querySelector(".lightbox-content");
    const btnClose = lightbox.querySelector(".lightbox-close");
    const btnPrev = lightbox.querySelector(".lightbox-prev");
    const btnNext = lightbox.querySelector(".lightbox-next");

    const overlay = lightbox.querySelector(".lightbox-overlay");
    let overlayTimeout;

    const touchOverlay = lightbox.querySelector(".lightbox-touch-overlay");
    let touchOverlayTimeout;
    let startX = 0;
    
    let images = [];
    let index = 0;

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function showTouchOverlay() {
        if (!isTouchDevice()) return;

        touchOverlay.classList.remove("hidden");

        clearTimeout(touchOverlayTimeout);
        touchOverlayTimeout = setTimeout(() => {
            touchOverlay.classList.add("hidden");
        }, 3000);
    }

    function hideTouchOverlay() {
        touchOverlay.classList.add("hidden");
    }

    function showOverlay() {
        overlay.classList.remove("hidden");

        clearTimeout(overlayTimeout);
        overlayTimeout = setTimeout(() => {
            overlay.classList.add("hidden");
        }, 3000);
    }

    function hideOverlay() {
        overlay.classList.add("hidden");
    }

    function openLightbox(i) {
        index = i;
        content.innerHTML = images[i].outerHTML;
        lightbox.classList.remove("hidden");
        showOverlay();  // keyboard navigation overlay
        showTouchOverlay(); // touch navigation overlay
    }

    function closeLightbox() {
        lightbox.classList.add("hidden");
    }

    function next() {
        index = (index + 1) % images.length;
        openLightbox(index);
    }

    function prev() {
        index = (index - 1 + images.length) % images.length;
        openLightbox(index);
    }

    btnClose.addEventListener("click", closeLightbox);
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);

    document.addEventListener("keydown", (e) => {
        hideOverlay();
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
        if (e.key === " ") {e.preventDefault();
            next();
        }
    });

    lightbox.addEventListener("mousemove", () => {
        showOverlay();
    });

    lightbox.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        hideTouchOverlay();
    }
    );

    lightbox.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? next() : prev();
        }
    });

    lightbox.addEventListener("timeupdate", () => {
        showTouchOverlay();
    });

    document.querySelectorAll(".gallery picture").forEach((pic, i) => {
        images.push(pic.cloneNode(true));
        pic.addEventListener("click", () => openLightbox(i));
        pic.style.cursor = "zoom-in";
    });
});

