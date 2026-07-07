import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          // Trigger once: unobserve immediately
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const target = parseInt(value, 10);
    if (isNaN(target)) return;

    let startTimestamp = null;
    let animationFrameId;

    // Smooth easeOutCubic transition
    const easeOutCubic = (x) => {
      return 1 - Math.pow(1 - x, 3);
    };

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted, value, duration]);

  return (
    <span ref={elementRef} className="animated-counter">
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
