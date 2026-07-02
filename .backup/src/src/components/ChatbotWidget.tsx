import React, { useState, useRef, useEffect } from 'react';
import { useTracking } from '../hooks/useTracking';
import { MessageSquare, X, Send, Bot, User, Settings, Key } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const { trackEvent } = useTracking();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Xin chào! Tôi là HelioAI, trợ lý ảo tư vấn sản phẩm HelioRing. Bạn cần tôi hỗ trợ thông tin gì hôm nay? (Có thể hỏi về: pin, size nhẫn, giá cả, chất liệu, tính năng, hoặc chính sách bảo hành nhé!)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('Mở khung Chatbot', 'Chatbot', 'Widget Toggle');
    }
  };

  // Local knowledge response system
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('pin') || q.includes('sạc') || q.includes('battery')) {
      return 'HelioRing Gen 3 sở hữu thời lượng pin lên đến 7 ngày sử dụng liên tục. Bộ sản phẩm đi kèm đế sạc không dây tiện lợi, sạc đầy từ 0% đến 100% cực nhanh chỉ mất khoảng 80 phút!';
    }
    if (q.includes('size') || q.includes('cỡ') || q.includes('kích thước') || q.includes('đo')) {
      return 'HelioRing có đầy đủ các kích cỡ từ size 6 đến 13 (chuẩn US). Bạn có thể tham khảo mục "Hướng dẫn đo size" ở phần Cấu hình trên website. Nếu bạn không chắc chắn, sau khi đặt hàng chúng tôi sẽ gửi bộ đo size chuyên dụng hoàn toàn miễn phí để bạn đo thử tại nhà trước khi gửi nhẫn chính thức!';
    }
    if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('tiền') || q.includes('cost') || q.includes('price')) {
      return 'HelioRing Gen 3 đang được khuyến mãi lớn: Giá bán ưu đãi chỉ còn 6.990.000 ₫ (giá gốc 8.500.000 ₫). Nếu bạn đăng ký email nhận tin sớm ở form đăng ký phía trên, bạn sẽ được tặng kèm voucher giảm thêm 15% nữa!';
    }
    if (q.includes('chất liệu') || q.includes('titan') || q.includes('chống nước') || q.includes('nước') || q.includes('bơi')) {
      return 'Nhẫn HelioRing được đúc bằng Titanium chuẩn hàng không vũ trụ siêu bền, siêu nhẹ (chỉ nặng từ 2.4g đến 3g tùy size), mặt trong lót nhựa y tế không dị ứng. Nhẫn đạt chuẩn kháng nước 5ATM (sâu 50m) giúp bạn hoàn toàn an tâm khi bơi lội, tắm rửa hoặc rửa tay hàng ngày.';
    }
    if (q.includes('tính năng') || q.includes('sức khỏe') || q.includes('đo') || q.includes('làm gì') || q.includes('chức năng')) {
      return 'HelioRing Gen 3 có thể tự động theo dõi: Nhịp tim & biến thiên nhịp tim HRV 24/7, nồng độ oxy trong máu SpO2, nhiệt độ da để phát hiện sớm triệu chứng ốm, và phân tích giấc ngủ chuyên sâu (gồm ngủ sâu, ngủ mơ REM). Ngoài ra, nhẫn hỗ trợ tính năng Cử chỉ thông minh (Smart Gesture) để bạn lướt slide hoặc chụp ảnh từ xa!';
    }
    if (q.includes('ship') || q.includes('giao hàng') || q.includes('vận chuyển') || q.includes('phí')) {
      return 'Helicorp miễn phí vận chuyển toàn quốc cho tất cả đơn hàng HelioRing. Bạn sẽ nhận được hàng trong vòng 1-2 ngày đối với Tp.HCM/Hà Nội và 2-3 ngày với các tỉnh thành khác. Bạn có quyền mở hộp kiểm tra sản phẩm trước khi thanh toán (COD).';
    }
    if (q.includes('bảo hành') || q.includes('đổi trả') || q.includes('lỗi')) {
      return 'Sản phẩm được bảo hành chính hãng 1 đổi 1 trong vòng 12 tháng nếu phát sinh lỗi phần cứng từ nhà sản xuất. Chúng tôi cũng hỗ trợ đổi size nhẫn miễn phí trong vòng 7 ngày đầu nếu bạn đeo không vừa vặn!';
    }
    if (q.includes('helicorp') || q.includes('healthy living') || q.includes('tuyển dụng') || q.includes('thực tập')) {
      return 'Helicorp (Healthy Living Corporation) là doanh nghiệp đi đầu trong lĩnh vực thiết bị sức khỏe thông minh và phát triển website. Bài thi thử thách thiết kế Landing Page này được thực hiện bởi ứng viên Thực tập sinh IT Phát triển Website. Cảm ơn Hội đồng Tuyển dụng đã dành thời gian đánh giá bài làm của tôi!';
    }
    
    return 'Chào bạn! Tôi là HelioAI. Tôi có thể giải đáp nhanh cho bạn các câu hỏi liên quan đến: Pin của nhẫn, Cách chọn size, Giá bán khuyến mãi, Chất liệu Titanium & chuẩn chống nước, Các chỉ số sức khỏe đo được, hoặc Chính sách đổi trả bảo hành. Hãy gõ từ khóa liên quan nhé!';
  };

  // Connect directly to Gemini API if key is present
  const fetchGeminiResponse = async (userText: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Bạn là HelioAI - Trợ lý ảo thông minh tư vấn về nhẫn sức khỏe HelioRing phát triển bởi công ty Helicorp. 
                    Thông tin sản phẩm: 
                    - Giá: 6.990.000đ (giá gốc 8.500.000đ), giảm thêm 15% khi nhập mail đăng ký sớm.
                    - Size: 6 đến 13 US. Có gửi bộ đo size miễn phí khi đặt mua.
                    - Pin: 7 ngày dùng, sạc 80 phút qua đế sạc USB-C đi kèm.
                    - Chất liệu: Vỏ Titanium hàng không, ruột nhựa y tế thân thiện da. Cực nhẹ 2.4g. Chống nước 5ATM (50m).
                    - Cảm biến: Đo nhịp tim, HRV, SpO2, nhiệt độ cơ thể, theo dõi giấc ngủ 4 giai đoạn. Cử chỉ Smart Gesture điều khiển điện thoại chụp ảnh, lướt nhạc.
                    - Chính sách: Bảo hành 1 đổi 1 trong 12 tháng, miễn phí vận chuyển toàn quốc, kiểm hàng trước nhận.
                    
                    Yêu cầu: Hãy trả lời người dùng ngắn gọn, thân thiện bằng tiếng Việt, tập trung tư vấn sản phẩm. Câu hỏi của khách hàng: "${userText}"`
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.7,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || getLocalResponse(userText);
    } catch (err) {
      console.error('Gemini API Error:', err);
      return `[Lỗi API Gemini - Tự động chuyển về bộ trả lời cục bộ]: ${getLocalResponse(userText)}`;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    trackEvent(`Gửi tin nhắn chatbot`, 'Chatbot', `Nội dung: ${userText}`);

    // Simulate thinking delay
    setTimeout(async () => {
      let aiText = '';
      if (apiKey.trim()) {
        aiText = await fetchGeminiResponse(userText);
      } else {
        aiText = getLocalResponse(userText);
      }

      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      trackEvent('Nhận tin nhắn phản hồi chatbot', 'Chatbot', 'AI Response Sent');
    }, 1000 + Math.random() * 800); // 1-1.8s delay for typing simulation
  };

  return (
    <div className="chatbot-widget-container">
      {/* Floating Action Button */}
      <button 
        className={`chatbot-trigger-btn ${isOpen ? 'active' : ''}`} 
        onClick={handleToggleChat}
        title="Trò chuyện tư vấn HelioRing"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && <span className="chatbot-pulse-dot"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window glass-panel animate-slide-up">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <Bot size={18} />
              <div>
                <h4>Trợ Lý HelioAI</h4>
                <span className="chat-status">🟢 Đang trực tuyến</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button 
                className={`chat-config-btn ${showConfig ? 'active' : ''}`}
                onClick={() => setShowConfig(!showConfig)}
                title="Cấu hình Gemini API"
              >
                <Settings size={16} />
              </button>
              <button className="chat-close-btn" onClick={handleToggleChat}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Optional Gemini API Config Box */}
          {showConfig && (
            <div className="api-config-panel animate-fade-in">
              <div className="config-banner">
                <Key size={14} />
                <span>Cấu hình Gemini API (Không bắt buộc)</span>
              </div>
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder="Nhập Gemini API Key tại đây..." 
              />
              <p className="config-desc">
                * Nếu bỏ trống, chatbot sẽ sử dụng kịch bản lập trình sẵn cực kỳ nhanh và chi tiết. Bạn có thể lấy API Key miễn phí tại <a href="https://aistudio.google.com" target="_blank" rel="noreferrer">Google AI Studio <span style={{ fontSize: '10px' }}>🔗</span></a>.
              </p>
            </div>
          )}

          {/* Messages Body */}
          <div className="chat-messages-body">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-row ai-row">
                <div className="message-avatar">
                  <Bot size={14} />
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Hỏi về size, pin, giá, chất liệu..."
              maxLength={150}
            />
            <button type="submit" disabled={!inputValue.trim() || isTyping}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .chatbot-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: var(--font-sans);
        }

        .chatbot-trigger-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
          transition: var(--transition-smooth);
          position: relative;
        }

        .chatbot-trigger-btn:hover {
          transform: scale(1.08) translateY(-2px);
        }

        .chatbot-trigger-btn.active {
          transform: rotate(90deg);
        }

        .chatbot-pulse-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--brand-error);
          border: 2px solid var(--bg-primary);
        }

        .chatbot-pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--brand-error);
          opacity: 0.5;
          animation: pulse-glow 1.5s infinite;
        }

        /* Chat Window styling */
        .chatbot-window {
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 380px;
          height: 520px;
          border-radius: 24px;
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: var(--glass-shadow);
          overflow: hidden;
        }

        .chat-header {
          padding: 1rem 1.25rem;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .chat-header-title h4 {
          font-weight: 800;
          font-size: 0.95rem;
          margin: 0;
          color: var(--text-primary);
        }

        .chat-status {
          font-size: 0.7rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .chat-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chat-config-btn, .chat-close-btn {
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .chat-config-btn:hover, .chat-close-btn:hover {
          color: var(--text-primary);
        }

        .chat-config-btn.active {
          color: var(--primary-gold);
        }

        /* API key config styling */
        .api-config-panel {
          padding: 10px 1.25rem;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          text-align: left;
        }

        .config-banner {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .api-config-panel input {
          width: 100%;
          height: 32px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          padding: 0 8px;
          font-size: 0.75rem;
          font-family: var(--font-sans);
          outline: none;
          background-color: var(--surface-primary);
          color: var(--text-primary);
        }

        .config-desc {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          margin-top: 4px;
          line-height: 1.3;
        }

        .config-desc a {
          color: var(--brand-primary);
          text-decoration: underline;
        }

        /* Messages area */
        .chat-messages-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-message-row {
          display: flex;
          gap: 8px;
          max-width: 85%;
        }

        .ai-row {
          align-self: flex-start;
          text-align: left;
        }

        .user-row {
          align-self: flex-end;
          flex-direction: row-reverse;
          text-align: right;
        }

        .message-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border-color);
        }

        .user-row .message-avatar {
          background-color: var(--text-primary);
          color: var(--bg-primary);
        }

        .message-bubble-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .ai-row .message-bubble {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border-top-left-radius: 2px;
        }

        .user-row .message-bubble {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-top-right-radius: 2px;
        }

        .message-bubble p {
          margin: 0;
          white-space: pre-line;
        }

        .message-time {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          font-weight: 500;
          margin: 0 4px;
        }

        /* Typing Dots Animation */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-tertiary);
          animation: chat-typing-anim 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes chat-typing-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* Input Form */
        .chat-input-form {
          border-top: 1px solid var(--border-color);
          padding: 10px;
          display: flex;
          gap: 8px;
          background-color: var(--surface-primary);
        }

        .chat-input-form input {
          flex-grow: 1;
          height: 40px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0 12px;
          font-size: 0.85rem;
          font-family: var(--font-sans);
          outline: none;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          transition: var(--transition-fast);
        }

        .chat-input-form input:focus {
          border-color: var(--text-primary);
        }

        .chat-input-form button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .chat-input-form button:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        .chat-input-form button:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        @media (max-width: 576px) {
          .chatbot-window {
            width: calc(100vw - 24px);
            right: 0px;
            bottom: 72px;
            height: 460px;
          }
        }
      `}</style>
    </div>
  );
};
