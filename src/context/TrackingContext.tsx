import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

export interface TrackedEvent {
  id: string;
  action: string;
  category: string;
  label?: string;
  timestamp: Date;
}

export interface WebhookResult {
  url: string;
  payload: any;
  isValid: boolean;
  errors: string[];
  status?: number;
  statusText?: string;
  responseBody?: string;
  timestamp?: Date;
}

interface TrackingContextType {
  events: TrackedEvent[];
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  liveNotify: boolean;
  setLiveNotify: (enabled: boolean) => void;
  lastWebhookResult: WebhookResult | null;
  trackEvent: (action: string, category: string, label?: string) => void;
  sendNewsletterWebhook: (name: string, email: string, phone: string) => Promise<boolean>;
  clearEvents: () => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const webhookUrl = 'https://webhook.site/e1374759-efb2-4f1c-ad9b-586518d5cfda';
  const setWebhookUrl = (url: string) => {
    // No-op since Webhook URL is hardcoded to the user's specific endpoint
  };
  const [liveNotify, setLiveNotifyState] = useState(false);
  const [lastWebhookResult, setLastWebhookResult] = useState<WebhookResult | null>(null);

  const setLiveNotify = (enabled: boolean) => {
    setLiveNotifyState(enabled);
    localStorage.setItem('heliowatch_live_notify', String(enabled));
  };

  // Track event function
  const trackEvent = useCallback((action: string, category: string, label?: string) => {
    const newEvent: TrackedEvent = {
      id: Math.random().toString(36).substring(2, 9),
      action,
      category,
      label,
      timestamp: new Date()
    };

    setEvents(prev => [newEvent, ...prev].slice(0, 100)); // Keep last 100 events

    // 1. Validate behaviour event data
    const errors: string[] = [];
    if (!action || action.trim().length < 2) {
      errors.push('Action name must be at least 2 characters long.');
    }
    if (!category || category.trim().length < 2) {
      errors.push('Category must be at least 2 characters long.');
    }

    const isValid = errors.length === 0;

    // Display Toast notification for user behavior if live tracking notification is on
    if (liveNotify) {
      // Avoid spamming SpO2/Scroll reveals too aggressively, keep it clean
      const showToastForEvent = !action.toLowerCase().includes('scroll') || Math.random() < 0.3; // Sample scroll events slightly or display concisely
      if (showToastForEvent) {
        showToast(
          '🔍 Tracking Hành vi',
          `${action} [${category}]`,
          'info'
        );
      }
    }

    console.log(`[Tracking] Action: ${action}, Category: ${category}, Label: ${label}`);

    // Prevent recursive loop for Webhook/Dev Console events
    const isInternalEvent = ['dev console', 'webhook', 'newsletter', 'navigation'].includes(category.toLowerCase()) || 
                            action.toLowerCase().includes('webhook') || 
                            action.toLowerCase().includes('đăng ký');

    if (isValid && webhookUrl && !isInternalEvent) {
      // Send event to Webhook asynchronously in the background
      const payload = {
        event: 'user_behavior',
        action,
        category,
        label: label || '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (response.ok) {
          if (liveNotify) {
            // Display webhook sent notification for clicks or sampled scrolls
            const showWebhookToast = !action.toLowerCase().includes('scroll');
            if (showWebhookToast) {
              showToast('⚡ Webhook Sent', `Đã gửi sự kiện '${action}' về Webhook!`, 'success');
            }
          }
        }
      })
      .catch(err => {
        console.error('Error sending behavior event to Webhook:', err);
      });
    }
  }, [liveNotify, showToast, webhookUrl]);

  // Validate and send Newsletter submission data to Webhook
  const sendNewsletterWebhook = async (name: string, email: string, phone: string): Promise<boolean> => {
    const errors: string[] = [];

    // 1. Validate Name
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      errors.push('Họ tên phải có độ dài từ 2 đến 50 ký tự.');
    }
    // Simple regex to check special characters or numbers in names (Vietnamese accented characters included)
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐÊÔƠưăâđêôơ\s]+$/;
    if (!nameRegex.test(trimmedName)) {
      errors.push('Họ tên không được chứa chữ số hoặc ký tự đặc biệt.');
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Địa chỉ email không đúng định dạng.');
    }

    // 3. Validate Phone (Vietnamese phone number: 10 digits, starts with 03, 05, 07, 08, 09)
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.push('Số điện thoại Việt Nam không hợp lệ (phải gồm 10 chữ số bắt đầu bằng 03, 05, 07, 08, 09).');
    }

    const isValid = errors.length === 0;
    const payload = {
      name: trimmedName,
      email: email.trim(),
      phone: phone.trim(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    };

    if (!isValid) {
      const result: WebhookResult = {
        url: webhookUrl,
        payload,
        isValid: false,
        errors,
        timestamp: new Date()
      };
      setLastWebhookResult(result);
      localStorage.setItem('heliowatch_last_webhook', JSON.stringify(result));
      showToast('Thất bại', 'Dữ liệu không hợp lệ! Vui lòng kiểm tra lại.', 'error');
      trackEvent('Gửi đăng ký sớm thất bại (Dữ liệu không hợp lệ)', 'Newsletter', 'Webhook Validation Error');
      return false;
    }

    // If valid, trigger actual Webhook post
    try {
      trackEvent('Bắt đầu gửi dữ liệu đăng ký tới Webhook...', 'Newsletter', 'Webhook Start');
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      });

      let responseText = '';
      try {
        responseText = await response.text();
      } catch (e) {
        responseText = '(Không có phản hồi từ server)';
      }

      const result: WebhookResult = {
        url: webhookUrl,
        payload,
        isValid: true,
        errors: [],
        status: response.status,
        statusText: response.statusText,
        responseBody: responseText,
        timestamp: new Date()
      };

      setLastWebhookResult(result);
      localStorage.setItem('heliowatch_last_webhook', JSON.stringify(result));

      if (response.ok || response.status === 0) {
        showToast('Thành công', 'Dữ liệu hợp lệ! Đã gửi Webhook thành công.', 'success');
        trackEvent('Gửi đăng ký tới Webhook thành công', 'Newsletter', `Status: ${response.status}`);
        return true;
      } else {
        showToast('Cảnh báo', `Webhook trả về mã lỗi: ${response.status}`, 'error');
        trackEvent('Gửi đăng ký tới Webhook thất bại', 'Newsletter', `Status: ${response.status}`);
        return false;
      }
    } catch (error: any) {
      console.error('Webhook fetch error:', error);
      const result: WebhookResult = {
        url: webhookUrl,
        payload,
        isValid: true,
        errors: [],
        statusText: error.message || 'Lỗi mạng kết nối Webhook',
        responseBody: error.toString(),
        timestamp: new Date()
      };
      setLastWebhookResult(result);
      localStorage.setItem('heliowatch_last_webhook', JSON.stringify(result));

      showToast('Lỗi mạng', 'Không thể kết nối với Webhook URL.', 'error');
      trackEvent('Không thể kết nối Webhook (Lỗi mạng)', 'Newsletter', error.message);
      return false;
    }
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <TrackingContext.Provider value={{
      events,
      webhookUrl,
      setWebhookUrl,
      liveNotify,
      setLiveNotify,
      lastWebhookResult,
      trackEvent,
      sendNewsletterWebhook,
      clearEvents
    }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTrackingContext = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTrackingContext must be used within a TrackingProvider');
  }
  return context;
};
