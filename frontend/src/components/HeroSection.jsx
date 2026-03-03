import React, { useState, useEffect } from "react";
import img1 from "../assets/home1.png";
import img2 from "../assets/home2.png";
import img3 from "../assets/home3.png";
const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { id: 1, img: img1, content: "Page 1" },
    { id: 2, img: img2, content: "Page 2" },
    { id: 3, img: img3, content: "Page 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            ...styles.slide,
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          <img
            src={slide.img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <h1>{slide.content}</h1>
        </div>
      ))}
    </div>
  );
};
const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "opacity 0.8s ease-in-out",
  },
};
export default AutoSlider;