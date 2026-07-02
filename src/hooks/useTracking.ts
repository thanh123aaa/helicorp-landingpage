import { useCallback } from 'react';

export const useTracking = () => {
  const trackEvent = useCallback((action: string, category: string, label?: string) => {
    console.log([Tracking Mock] Action: \, Category: \, Label: \);
  }, []);

  return { trackEvent };
};
