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

    let velocityX = 0;
    let velocityY = 0;

    let lastTouchX = 0;
    let lastTouchY = 0;
    let lastMoveTime = 0;

    let momentumFrame = null;

    let lastTapTime = 0;

    let isAnimating = false;
    let animationFrame = null;

    const doubleTapThreshold = 300; // Time in ms to detect double tap
    const doubleTapZoom = 2.5; // Zoom level for double tap

    function animateZoom(startScale, endScale, duration = 250) {
        const img = lightbox.querySelector(".lightbox-content img");
        const startTime = performance.now();
        isAnimating = true;

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            scale = startScale + (endScale - startScale) * eased;
            updateTransform();

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                isAnimating = false;
                scale = endScale; // Ensure final scale is set
                updateTransform();
            }
        }

        animationFrame = requestAnimationFrame(step);
    }

    function startMomentum() {
        const friction = 0.95; // Friction factor for momentum
        const stopSpeed = 0.02; // Minimum speed to stop momentum

        function step() {
            panX += velocityX * 10; // Assuming 60fps, so 16ms per frame
            panY += velocityY * 16;
            clampPan();
            updateTransform();

            velocityX *= friction;
            velocityY *= friction;

            if (Math.abs(velocityX) > stopSpeed || Math.abs(velocityY) > stopSpeed) {
                momentumFrame = requestAnimationFrame(step);
            } else {
                velocityX = 0;
                velocityY = 0;
                momentumFrame = null;
            }
        }

        if (momentumFrame) {
            cancelAnimationFrame(momentumFrame);
        }
        momentumFrame = requestAnimationFrame(step);
    }

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
        cancelAnimationFrame(momentumFrame); // Stop any ongoing momentum when a new touch starts
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
        const now = performance.now();
        const timeSinceLastTap = now - lastTapTime;
        if (timeSinceLastTap < doubleTapThreshold && e.touches.length === 1) {
            e.preventDefault();
            const img = lightbox.querySelector(".lightbox-content img");
            const touch = e.touches[0];
            const rect = img.getBoundingClientRect();

            cancelAnimationFrame(animationFrame); // Stop any ongoing animation on double tap

            const tapX = touch.clientX - rect.left;
            const tapY = touch.clientY - rect.top;

            if (scale === 1) {
                scale = doubleTapZoom;
                // Zoom in on double tap
                const targetScale = doubleTapZoom;
                const rect = img.getBoundingClientRect();
                const offsetX = touch.clientX - rect.left - rect.width / 2;
                const offsetY = touch.clientY - rect.top - rect.height / 2;

                panX = -offsetX * (doubleTapZoom - 1);
                panY = -offsetY * (doubleTapZoom - 1);

                animateZoom(1, targetScale);

                } else {

                // Reset zoom on second tap
                targetScale = Math.min(scale * 1.6, 4); // Increase zoom level on subsequent taps, up to 4x
                const offsetX = tapX - rect.width / 2;
                const offsetY = tapY - rect.height / 2;

                panX = -offsetX * (targetScale - 1);
                panY = -offsetY * (targetScale - 1);

                animateZoom(scale, targetScale);

            }
            // Double tap detected
            clampPan();
            updateTransform();
            lastTapTime = now; // Reset last tap time to prevent triple tap
            return;
        }
        lastTapTime = now;
    });

    lightbox.addEventListener("touchmove", (e) => {
        if (scale > 1 && e.touches.length === 1) {
            e.preventDefault();

            const touch = e.touches[0];
            const now = performance.now();


            const dx = touch.clientX - lastTouchX;
            const dy = touch.clientY - lastTouchY;
            const dt = now - lastMoveTime;

            if (dt > 0) {
                velocityX = dx / dt;
                velocityY = dy / dt;
                
            }
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            lastMoveTime = now;

            panX += dx;
            panY += dy;

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
        if (scale > 1 && e.touches.length === 0) {
            cancelAnimationFrame(momentumFrame);
            startMomentum();
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

