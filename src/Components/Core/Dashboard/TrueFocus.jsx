import React, { useState, useEffect, useRef } from "react";
import './TrueFocus.css';

const TrueFocus = ({
  sentence = "Chat Flow",
  blurAmount = 6,
  borderColor = "#5227FF",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
}) => {
  const words = sentence.split(" ");
  const [activeIndex, setActiveIndex] = useState(0);
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const containerRef = useRef(null);
  const wordRefs = useRef([]);

  // Auto-animate focus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [words.length, animationDuration, pauseBetweenAnimations]);

  // Calculate position of the focus frame
  useEffect(() => {
    const activeElement = wordRefs.current[activeIndex];
    if (activeElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const wordRect = activeElement.getBoundingClientRect();

      setRect({
        top: wordRect.top - containerRect.top,
        left: wordRect.left - containerRect.left,
        width: wordRect.width,
        height: wordRect.height,
      });
    }
  }, [activeIndex]);

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          className={`focus-word ${activeIndex === index ? "active" : ""}`}
          style={{
            filter: activeIndex === index ? "blur(0)" : `blur(${blurAmount}px)`,
            "--border-color": borderColor,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}

      <div
        className="focus-frame"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transition: `all ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
          "--border-color": borderColor,
        }}
      >
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
    </div>
  );
};

export default TrueFocus;