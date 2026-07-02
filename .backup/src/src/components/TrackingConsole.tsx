import React, { useState } from 'react';
import { useTracking } from '../hooks/useTracking';
import { X, Play, Terminal, Eye, EyeOff } from 'lucide-react';

interface TrackingConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackingConsole: React.FC<TrackingConsoleProps> = ({ isOpen, onClose }) => {
  const { events } = useTracking();
  const [filter, setFilter] = useState<string>('all');
  const [showConsole, setShowConsole] = useState(true);

  if (!isOpen) return null;

  const categories = ['all', 'Scroll', 'Product Customizer', 'E-commerce', 'Form Đăng ký', 'Chatbot'];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <div className="dev-console-wrapper glass-panel animate-slide-up">
      <div className="console-header">
        <div className="console-title">
          <Terminal size={16} />
          <span>Hệ Thống Theo Dõi Hành Vi (Developer Console)</span>
        </div>
        <div className="console-controls">
          <button 
            className="console-min-btn" 
            onClick={() => setShowConsole(!showConsole)}
            title={showConsole ? "Thu nhỏ logs" : "Mở rộng logs"}
          >
            {showConsole ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button className="console-close-btn" onClick={onClose} title="Đóng">
            <X size={16} />
          </button>
        </div>
      </div>

      {showConsole && (
        <div className="console-body">
          <p className="console-intro">
            Trình mô phỏng ghi nhận sự kiện tương tác của người dùng theo thời gian thực (real-time). Dữ liệu này có thể được đồng bộ trực tiếp với các nền tảng phân tích (Google Analytics, Mixpanel) hoặc gửi về Webhook.
          </p>

          <div className="filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-badge ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          <div className="logs-terminal">
            {filteredEvents.length === 0 ? (
              <div className="terminal-empty">
                <Play size={14} className="terminal-arrow" />
                <span>Chờ sự kiện... Hãy thử cuộn trang, click các nút, đổi màu nhẫn, hoặc đặt hàng!</span>
              </div>
            ) : (
              filteredEvents.map(event => (
                <div key={event.id} className="terminal-line animate-fade-in">
                  <span className="log-time">[{event.timestamp}]</span>
                  <span className="log-category">[{event.category}]</span>
                  <span className="log-action">{event.action}</span>
                  {event.label && <span className="log-label">→ {event.label}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        .dev-console-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: calc(100vw - 48px);
          max-width: 580px;
          z-index: 9998;
          border-radius: 16px;
          background-color: rgba(18, 22, 31, 0.95);
          color: #a7f3d0; /* Mint color for terminal vibe */
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          overflow: hidden;
        }

        [data-theme='light'] .dev-console-wrapper {
          background-color: rgba(18, 22, 31, 0.95);
          color: #a7f3d0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        .console-header {
          padding: 10px 16px;
          background-color: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .console-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.775rem;
          font-weight: 700;
          color: #ffffff;
        }

        .console-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .console-min-btn, .console-close-btn {
          color: rgba(255, 255, 255, 0.6);
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
        }

        .console-min-btn:hover, .console-close-btn:hover {
          color: #ffffff;
        }

        .console-body {
          padding: 1rem;
        }

        .console-intro {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          margin-bottom: 12px;
          font-family: var(--font-sans);
        }

        .filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .filter-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-sans);
          transition: var(--transition-fast);
        }

        .filter-badge:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .filter-badge.active {
          background-color: #10b981;
          color: #12131a;
        }

        .logs-terminal {
          height: 180px;
          overflow-y: auto;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.725rem;
          text-align: left;
        }

        .terminal-empty {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.35);
          height: 100%;
          justify-content: center;
          text-align: center;
          font-size: 0.75rem;
          padding: 1rem;
        }

        .terminal-arrow {
          animation: pulse-glow 1.5s infinite;
        }

        .terminal-line {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          line-height: 1.4;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.02);
          padding-bottom: 2px;
        }

        .log-time {
          color: rgba(255, 255, 255, 0.4);
        }

        .log-category {
          color: #3b82f6;
          font-weight: 700;
        }

        .log-action {
          color: #e2e8f0;
        }

        .log-label {
          color: #34d399;
        }

        @media (max-width: 768px) {
          .dev-console-wrapper {
            bottom: 84px; /* Move up slightly to not overlap chatbot or navigation */
            right: 12px;
            width: calc(100vw - 24px);
          }
        }
      `}</style>
    </div>
  );
};
