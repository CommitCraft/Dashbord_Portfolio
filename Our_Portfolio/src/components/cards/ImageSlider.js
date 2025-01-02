import React, { useState, useEffect } from "react";
import './ImageSlider.css';

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
      return () => clearInterval(slideInterval);
    }
  }, [images, interval]);

  // Return "No Image Found" message if images array is empty or not provided
  if (!images || images.length === 0) {
    return (
      <div className="no-image">
        <p>No image found</p>
      </div>
    );
  }

  return (
    <div className="image-slider">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
