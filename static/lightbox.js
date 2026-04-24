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

    let scale = 1;
    let startDistance = 0;

    let panX = 0;
    let panY = 0;
    let startPanX = 0;
    let startPanY = 0;
    let startTouchX = 0;
    let startTouchY = 0;

    function isZoomedOrPanning() {
        return scale > 1.01 || panX !== 0 || panY !== 0; // Consider zoomed if scale is greater than 1.01 to avoid floating point issues
    }

    function clampPan() {
        const maxPanX = (scale - 1) * window.innerWidth / 2;
        const maxPanY = (scale - 1) * window.innerHeight / 2;
        panX = Math.min(Math.max(panX, -maxPanX), maxPanX);
        panY = Math.min(Math.max(panY, -maxPanY), maxPanY);
    }

    function updateTransform() {
        const img = lightbox.querySelector(".lightbox-content img");
        if (img) {
            img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
        }
    }

    function isZoomed() {
        return scale > 1.01; // Consider zoomed if scale is greater than 1.01 to avoid floating point issues
    }

    function getDistance(touches) {
        const [a, b] = touches;
        const dx = a.clientX - b.clientX;
        const dy = a.clientY - b.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

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
        if (isZoomedOrPanning()) return; // Don't start new gesture if already zoomed or panning
        if (isZoomed()) return; // Don't start new gesture if already zoomed
        startX = e.touches[0].clientX;
        startTouchX = e.touches[0].clientX;
        startTouchY = e.touches[0].clientY;
        startPanX = panX;
        startPanY = panY;
        if (e.touches.length === 2) {
            startDistance = getDistance(e.touches);
            hideTouchOverlay();
        }
    });

    lightbox.addEventListener("touchmove", (e) => {
        if (scale > 1 && e.touches.length === 1) {
            e.preventDefault();
            const dx = e.touches[0].clientX - startTouchX;
            const dy = e.touches[0].clientY - startTouchY;
            panX = startPanX + dx;
            panY = startPanY + dy;
            clampPan();
            updateTransform();
        }
        if (e.touches.length === 2) {
            e.preventDefault();

            const currentDistance = getDistance(e.touches);
            const factor = currentDistance / startDistance;

            scale = Math.min(Math.max(factor, 1), 4); // Limit zoom between 1x and 4x
            const img = lightbox.querySelector(".lightbox-content img");
            if (img) {
                img.style.transform = `scale(${scale})`;
            }
        }
    }, { passive: false });

    lightbox.addEventListener("touchend", (e) => {
        if (isZoomed()) {
            showTouchOverlay(); // Show overlay when zoomed in
        }

        if (scale > 1 && e.touches.length === 0) {
            // Reset zoom on touch end
            setTimeout(() => {
                scale = 1;
                const img = lightbox.querySelector(".lightbox-content img");
                if (img) {
                    img.style.transform = `scale(1)`;
                }
            }, 3000); // Reset after 3 seconds of inactivity
        } else if (e.touches.length < 2) {
            scale = 1;
            panX = 0;
            panY = 0;
            const img = lightbox.querySelector(".lightbox-content img");
            if (img) {
                img.style.transform = `scale(1)`;
            }
        }
        if (scale <= 1.01) {
            scale = 1;
            panX = 0;
            panY = 0;
            updateTransform();
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

