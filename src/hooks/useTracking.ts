import { useTrackingContext } from '../context/TrackingContext';

export const useTracking = () => {
  const { trackEvent } = useTrackingContext();
  return { trackEvent };
};
