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
      
      startAnimation();
    }
  }, [hasRun, target, duration, startOnView]);

  return [count, ref];
}
