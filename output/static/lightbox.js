document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const content = lightbox.querySelector(".lightbox-content");
    const btnClose = lightbox.querySelector(".lightbox-close");
    const btnPrev = lightbox.querySelector(".lightbox-prev");
    const btnNext = lightbox.querySelector(".lightbox-next");
    const overlay = lightbox.querySelector(".lightbox-overlay");
    const touchOverlay = lightbox.querySelector(".lightbox-touch-overlay");

    const doubleTapTreshold = 300;  // milliseconden
    const doubleTapZoom = 2.5;  // zoomfactor bij double-tap

    let images = [];
    let index = 0;
    let overlayTimeout;
    let touchOverlayTimeout;
    let startX = 0;
    let scale = 1;
    let startDistance = 0;

    let panX = 0;
    let panY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let lastTouchX = 0;
    let lastTouchY = 0;
    let lastMoveTime = 0;

    let momentumFrame = null;

    let startPanX = 0;
    let startPanY = 0;
    let startTouchX = 0;
    let startTouchY = 0;

    let lastTapTime = 0;

    let isAnimating = false;
    let animationFrame = null;


    function animateZoom(startScale, endScale, duration = 250) {
        const img = lightbox.querySelector(".lightbox-content img");
        const startTime = performance.now();
        isAnimating = true;

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);  // cubic ease-out

            scale = startScale + (endScale - startScale) * eased;
            updateTransform();

            if (progress < 1){
                animationFrame = requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        animationFrame = requestAnimationFrame(step);
    }
     

    function startMomentum() {
        const friction = 0.95;  // hoe snel het afremt
        const stopSpeed = 0.02;  // minimale snelheid om te stoppen

        function step() {
            panX += velocityX * 16;  // 16ms is ongeveer 60fps
            panY += velocityY * 16;

            clampPan();
            updateTransform();

            velocityX *= friction;
            velocityY *= friction;

            if (Math.abs(velocityX) > stopSpeed || Math.abs(velocityY) > stopSpeed) {
                momentumFrame = requestAnimationFrame(step);
            }
        }

        momentumFrame = requestAnimationFrame(step);
    }

    function clampPan() {
        const maxPan = 200 * (scale - 1); // eenvoudige begrenzing
        panX = Math.max(Math.min(panX, maxPan), -maxPan);
        panY = Math.max(Math.min(panY, maxPan), -maxPan);
    }

    function updateTransform() {
        const img = lightbox.querySelector(".lightbox-content img");
        img.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }

    function getDistance(touches) {
        const [a, b] = touches;
        const dx = a.clientX - b.clientX;
        const dy = a.clientY - b.clientY;
        return Math.sqrt(dx*dx + dy*dy);
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
        showOverlay(); // keyboard overlay
        showTouchOverlay(); // touch overlay
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

    lightbox.addEventListener("mousemove", () => {
        showOverlay();
    });

    document.addEventListener("keydown", e => {
        if (e.key == "Escape") closeLightbox();
        if (e.key == "ArrowRight") next();
        if (e.key == "ArrowLeft") performance();
        if (e.key == " ") {
            e.preventDefault();
            next();
        }
    });

    lightbox.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        hideTouchOverlay;
    });

    lightbox.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? next() : prev();
        }
    });

    lightbox.addEventListener("touchmove", () => {
        showTouchOverlay();
    })
(factor, 1)
    lightbox.addEventListener("touchstart", e => {
        if (e.touches.length == 2) {
            startDistance = getDistance(e.touches);
            hideTouchOverlay();
        }
    });

    lightbox.addEventListener("touchmove", e => {
        if (e.touches.length == 2) {
            e.preventDefault();

            const currentDistance = getDistance(e.touches);
            const factor = currentDistance / startDistance;

            scale = Math.min(Math.max(factor, 1), 4); // tussen 1x en 4x zoom
            const img = lightbox.querySelector(".lightbox-content img");

            img.computedStyleMap.transform = `scale(${scale})`;
        }
    })

    lightbox.addEventListener("touchend", e => {
        if (scale <= 1.01) {
            scale = 1;
            panX = 0;
            panY = 0;
            updateTransform();
        }

        if (scale > 1 && e.touches.length == 0) {
            // terugveren naar 1x zoom
            setTimeout(() => {
                scale = 1;
                const img = lightbox.querySelector(".lightbox-content img");
                img.computedStyleMap.transform = "scale(1)";
            }, 200);
        }
    });

    function isZoomed() {
        return scale > 1.01;
    }

    function isZoomedOrPanning() {
        return scale > 1.01;
    }

    //lightbox.addEventListener("touchstart", e => {
        //if (isZoomed()) return; // swipe blokkeren
        //startX = e.touches[0].clientX;
    //});

    lightbox.addEventListener("touchend", e => {
        if (isZoomed()) return; // swipe blokkeren
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? next() : prev();
        }
    });

    lightbox.addEventListener("touchstart", e => {
        if (scale > 1 && e.touches.length == 1) {
            startTouchX = e.touches[0].clientX;
            startTouchY = e.touches[0].clientY;
            startPanX = panX;
            startPanY = panY;
        }
    });



    lightbox.addEventListener("touchstart", e => {
        if (isZoomedOrPanning()) return;
        startX = e.touches[0].clientX;
    })

    lightbox.addEventListener("touchmove", e => {
        if (scale > 1 && e.touches.length == 1) {
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
    });

    lightbox.addEventListener("touchend", e => {
        if (scale > 1 && e.touches.length == 0) {
            cancelAnimationFrame(momentumFrame);
            startMomentum;
        }
    });

    lightbox.addEventListener("touchstart", () => {
        cancelAnimationFrame(momentumFrame);
    });

    lightbox.addEventListener("touchstart", e => {
        const now = performance.now();
        const timeSinceLastTap = now - lastTapTime;

        if (timeSinceLastTap < doubleTapTreshold && e.touches.length == 1) {
            e.preventDefault();

            const img = lightbox.querySelector(".lightbox-content img");
            const touch = e.touches[0];
            const rect = img.getBoundingClientRect();

            cancelAnimationFrame(animationFrame);

            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;

            if (scale == 1) {
                //scale = doubleTapZoom;
                const targetScale = doubleTapZoom;

                //const rect = img.getBoundingClientRect();
                const offsetX = touch.clientX - rect.left - rect.width / 2;
                const offsetY = touch.clientY - rect.top - rect.height / 2;

                panX = -offsetX * (targetScale - 1);
                panY = -offsetY * (targetScale - 1);

                animateZoom(1, targetScale);
            } else {
                const targetScale = Math.min(scale * 1.6, 4);

                const offsetX = tapX - rect.width / 2;
                const offsetY = tapY - rect.height / 2;

                panX -= offsetX * (targetScale / scale - 1);
                panY -= offsetY * (targetScale / scale - 1);

                animateZoom(scale, targetScale);

            }

            clampPan();
            updateTransform();
            lastTapTime = now;
            return;
        }

        lastTapTime = now;
    });


    document.querySelectorAll(".gallery picture").forEach((pic, i) => {
        images.push(pic.cloneNode(true));
        pic.addEventListener("click", () => openLightbox(i));
        pic.computedStyleMap.cursor = "zoom-in";
    });
});

