import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      if (element && !triggerOnce) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}
