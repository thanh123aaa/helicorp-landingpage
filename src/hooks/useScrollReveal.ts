import { useEffect, useRef, useState } from 'react';
import { useTrackingContext } from '../context/TrackingContext';

export const useScrollReveal = (threshold = 0.1, rootMargin = '-40px 0px -40px 0px') => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { trackEvent } = useTrackingContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hasTracked = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          
          // Detect parent section to track which section was scrolled to
          const section = el.closest('section');
          const sectionId = section?.id || el.id || '';
          
          if (sectionId && !hasTracked) {
            const sectionNames: Record<string, string> = {
              'customizer': 'Cấu hình sản phẩm (Customizer)',
              'specs': 'Thông số kỹ thuật (Specs)',
              'newsletter': 'Đăng ký nhận tin (Newsletter)',
              'features': 'Đặc quyền Bento Grid',
              'fitness': 'Động lực thể chất (Fitness)',
              'connect': 'Kết nối thông minh (Connect)',
              'hero': 'Băng chuyền chính (Hero)'
            };
            const sectionName = sectionNames[sectionId] || sectionId;
            trackEvent(`Cuộn tới phần: ${sectionName}`, 'Scroll Behaviour', `Section ID: ${sectionId}`);
            hasTracked = true; // Avoid double tracking per reveal instance
          }
          
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, trackEvent]);

  return { ref, visible };
};
