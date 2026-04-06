import React from "react";
import { useEffect, useMemo, useState } from "react";
import "./NatureAnimalSliderPage.css";

const images = Array.from({ length: 20 }, (_, index) => {
  const imageNo = String(index + 1).padStart(2, "0");
  const category = index < 10 ? "Nature" : "Animal";
  return {
    id: index + 1,
    title: `${category} Image ${index + 1}`,
    src: new URL(`../assets/slider-images/${imageNo}.jpg`, import.meta.url).href,
  };
});

export default function NatureAnimalSliderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const currentImage = useMemo(() => images[currentIndex], [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlay) {
      return undefined;
    }

    const autoTimer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(autoTimer);
  }, [isAutoPlay]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isModalOpen && event.key === "Escape") {
        setIsModalOpen(false);
      }
      if (event.key === "ArrowRight") {
        nextSlide();
      }
      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  return (
    <div className="slider-page">
      <div className="slider-shell">
        <h1>Nature & Animal Gallery</h1>
        <p>20 images with loop slider, autoplay, thumbnail strip and modal view.</p>

        <div
          className="slider-card"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <button className="nav-btn" onClick={previousSlide} aria-label="Previous image">
            Prev
          </button>

          <div className="image-wrap" onClick={() => setIsModalOpen(true)}>
            <img
              key={currentImage.id}
              className="slide-image"
              src={currentImage.src}
              alt={currentImage.title}
            />
            <span className="image-counter">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button className="nav-btn" onClick={nextSlide} aria-label="Next image">
            Next
          </button>
        </div>

        <div className="toolbar">
          <button className="auto-btn" onClick={() => setIsAutoPlay((prev) => !prev)}>
            {isAutoPlay ? "Pause Autoplay" : "Play Autoplay"}
          </button>
        </div>

        <div className="thumb-strip" aria-label="Image thumbnails">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`thumb-btn ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${image.title}`}
            >
              <img src={image.src} alt={image.title} />
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} role="presentation">
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              X
            </button>
            <img key={`modal-${currentImage.id}`} className="slide-image" src={currentImage.src} alt={currentImage.title} />
            <h3>{currentImage.title}</h3>
            <div className="modal-actions">
              <button className="nav-btn small" onClick={previousSlide}>
                Previous
              </button>
              <button className="nav-btn small" onClick={nextSlide}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
