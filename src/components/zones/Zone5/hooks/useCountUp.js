import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 1800, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView || hasRun) return;

    const startAnimation = () => {
      setHasRun(true);
      const startTime = performance.now();

      const tick = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(tick);
    };

    // If an element is being tracked via ref, use internal observer
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    } else if (startOnView) {
      // If no ref but startOnView is true (triggered externally), start immediately
      startAnimation();
    }
  }, [hasRun, target, duration, startOnView]);

  return [count, ref];
}
