import { useState, useEffect, useCallback } from 'react';

export interface TrackedEvent {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  label?: string;
}

// Global list to persist events across renders/components
let globalEvents: TrackedEvent[] = [];
let eventListeners: Array<(events: TrackedEvent[]) => void> = [];

const addGlobalEvent = (event: TrackedEvent) => {
  globalEvents = [event, ...globalEvents].slice(0, 100); // Keep last 100 events
  eventListeners.forEach(listener => listener(globalEvents));
};

export const useTracking = () => {
  const [events, setEvents] = useState<TrackedEvent[]>(globalEvents);

  useEffect(() => {
    const listener = (newEvents: TrackedEvent[]) => {
      setEvents(newEvents);
    };
    eventListeners.push(listener);
    return () => {
      eventListeners = eventListeners.filter(l => l !== listener);
    };
  }, []);

  const trackEvent = useCallback((action: string, category: string, label?: string) => {
    const newEvent: TrackedEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      action,
      category,
      label,
    };
    console.log(`[Tracking] ${category} - ${action}`, label ? `(${label})` : '');
    addGlobalEvent(newEvent);
  }, []);

  // Monitor scroll depth
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const triggered = new Set<number>();

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      
      const percent = Math.round(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
      );

      thresholds.forEach(threshold => {
        if (percent >= threshold && !triggered.has(threshold)) {
          triggered.add(threshold);
          trackEvent(`Cuộn trang ${threshold}%`, 'Scroll', `Độ sâu cuộn trang đạt ${threshold}%`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  return { events, trackEvent };
};
