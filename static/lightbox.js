document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const content = lightbox.querySelector(".lightbox-content");
    const btnClose = lightbox.querySelector(".lightbox-close");
    const btnPrev = lightbox.querySelector(".lightbox-prev");
    const btnNext = lightbox.querySelector(".lightbox-next");

    const overlay = lightbox.querySelector(".lightbox-overlay");
    let overlayTimeout;
    
    let images = [];
    let index = 0;

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
        showOverlay();
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

    document.querySelectorAll(".gallery picture").forEach((pic, i) => {
        images.push(pic.cloneNode(true));
        pic.addEventListener("click", () => openLightbox(i));
        pic.style.cursor = "zoom-in";
    });
});

