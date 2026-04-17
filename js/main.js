document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initWorksTabs();
    initGalleryViewer();
    initFilmViewer();
    initLightbox();
    initScrollTop();
    initFadeIn();
});

/* ── Mobile Nav Toggle ── */
function initNavToggle() {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("open");
        links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.classList.remove("open");
            links.classList.remove("open");
        });
    });

    document.addEventListener("click", (e) => {
        if (!links.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove("open");
            links.classList.remove("open");
        }
    });
}

/* ── Works Tabs ── */
function initWorksTabs() {
    const tabs = document.querySelectorAll(".works-tab");
    const panels = document.querySelectorAll(".works-panel");
    if (!tabs.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach((t) => t.classList.remove("active"));
            panels.forEach((p) => p.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(`panel-${target}`).classList.add("active");

            const galleryViewer = document.getElementById("gallery-viewer");
            const filmViewer = document.getElementById("film-viewer");
            if (galleryViewer) galleryViewer.classList.remove("open");
            if (filmViewer) {
                filmViewer.classList.remove("open");
                const vid = filmViewer.querySelector("video");
                if (vid) vid.pause();
            }
            document.querySelectorAll(".gallery-card, .film-card").forEach((c) =>
                c.classList.remove("active")
            );
        });
    });
}

/* ── Photography Gallery Inline Viewer ── */
function initGalleryViewer() {
    const cards = document.querySelectorAll(".gallery-card");
    const viewer = document.getElementById("gallery-viewer");
    if (!cards.length || !viewer) return;

    const titleEl = viewer.querySelector(".gallery-viewer__title");
    const imagesEl = viewer.querySelector(".gallery-viewer__images");
    const closeBtn = viewer.querySelector(".gallery-viewer__close");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const isAlreadyOpen =
                card.classList.contains("active") && viewer.classList.contains("open");

            cards.forEach((c) => c.classList.remove("active"));

            if (isAlreadyOpen) {
                viewer.classList.remove("open");
                return;
            }

            card.classList.add("active");

            const title = card.querySelector("h3").textContent;
            const imageList = card.dataset.images ? card.dataset.images.split(",") : [];

            titleEl.textContent = title;
            imagesEl.innerHTML = "";

            imageList.forEach((src, idx) => {
                const wrapper = document.createElement("div");
                wrapper.className = "polaroid-thumb";
                const img = document.createElement("img");
                img.src = src.trim();
                img.alt = `${title} — ${idx + 1}`;
                img.loading = "lazy";
                img.dataset.lightboxGroup = card.dataset.galleryId;
                img.dataset.lightboxIndex = idx;
                wrapper.appendChild(img);
                imagesEl.appendChild(wrapper);
            });

            viewer.classList.add("open");

            setTimeout(() => {
                viewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 50);
        });
    });

    closeBtn.addEventListener("click", () => {
        viewer.classList.remove("open");
        cards.forEach((c) => c.classList.remove("active"));
    });
}

/* ── Film Project Inline Viewer (MP4) ── */
function initFilmViewer() {
    const cards = document.querySelectorAll(".film-card");
    const viewer = document.getElementById("film-viewer");
    if (!cards.length || !viewer) return;

    const titleEl = viewer.querySelector(".film-viewer__title");
    const descEl = viewer.querySelector(".film-viewer__description");
    const embedEl = viewer.querySelector(".film-viewer__embed");
    const closeBtn = viewer.querySelector(".film-viewer__close");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const isAlreadyOpen =
                card.classList.contains("active") && viewer.classList.contains("open");

            cards.forEach((c) => c.classList.remove("active"));

            if (isAlreadyOpen) {
                viewer.classList.remove("open");
                const vid = embedEl.querySelector("video");
                if (vid) vid.pause();
                embedEl.innerHTML = "";
                return;
            }

            card.classList.add("active");

            const title = card.querySelector("h3").textContent;
            const description = card.querySelector("p").textContent;
            const videoSrc = card.dataset.video;

            titleEl.textContent = title;
            descEl.textContent = description;

            embedEl.innerHTML = "";
            if (videoSrc) {
                const video = document.createElement("video");
                video.src = videoSrc;
                video.controls = true;
                video.preload = "metadata";
                embedEl.appendChild(video);
            }

            viewer.classList.add("open");

            setTimeout(() => {
                viewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 50);
        });
    });

    closeBtn.addEventListener("click", () => {
        const vid = embedEl.querySelector("video");
        if (vid) vid.pause();
        viewer.classList.remove("open");
        embedEl.innerHTML = "";
        cards.forEach((c) => c.classList.remove("active"));
    });
}

/* ── Lightbox for Viewing Images Up Close ── */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    const img = lightbox.querySelector(".lightbox__img");
    const closeBtn = lightbox.querySelector(".lightbox__close");
    const prevBtn = lightbox.querySelector(".lightbox__prev");
    const nextBtn = lightbox.querySelector(".lightbox__next");

    let currentImages = [];
    let currentIndex = 0;

    function open(images, index) {
        currentImages = images;
        currentIndex = index;
        img.src = currentImages[currentIndex];
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function close() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        img.src = currentImages[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        img.src = currentImages[currentIndex];
    }

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
    });

    document.addEventListener("click", (e) => {
        const polaroid = e.target.closest(".polaroid-thumb");
        if (!polaroid) return;

        const container = polaroid.closest(".gallery-viewer__images");
        const allThumbs = Array.from(container.querySelectorAll(".polaroid-thumb img"));
        const srcs = allThumbs.map((i) => i.src);
        const clickedImg = polaroid.querySelector("img");
        const idx = allThumbs.indexOf(clickedImg);
        open(srcs, idx);
    });
}

/* ── Scroll-to-Top Button ── */
function initScrollTop() {
    const btn = document.getElementById("scroll-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ── Fade-In on Scroll ── */
function initFadeIn() {
    const elements = document.querySelectorAll(".fade-in");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
}
