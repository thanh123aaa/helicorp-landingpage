import { useCallback } from 'react';

export const useTracking = () => {
  const trackEvent = useCallback((action: string, category: string, label?: string) => {
    console.log(`[Tracking Mock] Action: ${action}, Category: ${category}, Label: ${label}`);
  }, []);

  return { trackEvent };
};
