import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Settings, RotateCcw } from 'lucide-react';
import { useTracking } from '../../hooks/useTracking';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const { trackEvent } = useTracking();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('heliowatch_gemini_key') || '');
  const [tempKey, setTempKey] = useState(apiKey);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Xin chào! Tôi là Helio AI, trợ lý tư vấn của HelioWatch Gen 3. Tôi có thể giải đáp các thông tin về tính năng, giá bán, thời lượng pin hoặc ưu đãi mở bán sớm cho bạn. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    trackEvent(isOpen ? 'Đóng cửa sổ Chatbot' : 'Mở cửa sổ Chatbot', 'Chatbot', 'Float Button Click');
  };

  const handleSaveSettings = () => {
    const trimmed = tempKey.trim();
    setApiKey(trimmed);
    if (trimmed) {
      localStorage.setItem('heliowatch_gemini_key', trimmed);
    } else {
      localStorage.removeItem('heliowatch_gemini_key');
    }
    setShowSettings(false);
    trackEvent('Cập nhật Gemini API Key', 'Chatbot', 'Settings Save');
  };

  const handleResetSettings = () => {
    setTempKey('');
    setApiKey('');
    localStorage.removeItem('heliowatch_gemini_key');
    setShowSettings(false);
    trackEvent('Xóa Gemini API Key', 'Chatbot', 'Settings Reset');
  };

  const fetchGeminiResponse = async (userText: string, chatHistory: Message[]): Promise<string> => {
    try {
      const systemInstruction = `Bạn là Helio AI, trợ lý tư vấn bán hàng trực tuyến thông minh của dòng sản phẩm đồng hồ cao cấp HelioWatch Gen 3.
Đây là thông tin chính xác về HelioWatch Gen 3:
- Chất liệu vỏ: Titanium cấp hàng không vũ trụ siêu nhẹ, siêu bền.
- Mặt kính: Tinh thể Sapphire chống trầy xước tuyệt đối.
- Mặt lưng: Gốm tráng gương tương thích sinh học cao cấp.
- Chống nước: Đạt chuẩn 5ATM (50m) theo ISO 22810:2010. Đi mưa, bơi lội thoải mái.
- Thời lượng pin: Lên đến 7 ngày dùng thông thường, 14 ngày tiết kiệm pin. Hỗ trợ sạc nhanh từ tính (45 phút được 80%).
- Tính năng sức khỏe: Cảm biến điện học tim (ECG), cảm biến nhịp tim quang học 24/7, SpO2, theo dõi giấc ngủ sâu 4 chu kỳ, cảm biến nhiệt độ da, ứng dụng Sinh Hiệu tổng hợp các chỉ số sức khỏe.
- Tính năng kết nối: Nhận cuộc gọi qua Bluetooth, trả lời tin nhắn thông minh tự động dịch ngôn ngữ, widget Smart Stack thông minh tự động thay đổi theo ngữ cảnh.
- Mức giá bán: Giá khuyến mãi đặt trước là 9,990,000đ (Giá gốc: 12,000,000đ) - Tiết kiệm ngay 17% (2,010,000đ).
- Dây đeo đi kèm (tùy chọn): Silicon Thể Thao (miễn phí), Dây da Ý Lịch Lãm, Titanium Bản Thép.
- Ưu đãi khi đăng ký sớm: Tặng mã giảm giá 15% khi mở bán, Bộ quà tặng trị giá 2,000,000đ (Dây da Ý + Củ sạc nhanh GaN 35W) và Nâng cấp bảo hành vàng 24 tháng 1 đổi 1.

Hãy trả lời câu hỏi của khách hàng một cách ngắn gọn (tối đa 2-3 câu), thân thiện, lễ phép và tập trung thuyết phục họ mua sản phẩm hoặc đăng ký thông tin sớm. Hãy xưng là "Helio AI" và gọi khách hàng là "bạn" hoặc "quý khách". Không trả lời các chủ đề chính trị, xã hội hoặc các chủ đề không liên quan khác. Nếu không có thông tin, hãy khuyên họ đăng ký nhận tin hoặc liên hệ hotline.`;

      const formattedContents = [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nLịch sử trò chuyện:\n${chatHistory.slice(-5).map(m => `${m.sender === 'user' ? 'Khách' : 'Helio AI'}: ${m.text}`).join('\n')}\n\nKhách: ${userText}\nHelio AI:` }]
        }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: formattedContents
          })
        }
      );

      if (!response.ok) {
        throw new Error('API Response not OK');
      }

      const data = await response.json();
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return botText ? botText.trim() : 'Tôi chưa hiểu ý bạn, bạn có thể nói rõ hơn được không?';
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      return 'Lỗi kết nối Gemini API. Vui lòng kiểm tra lại API Key hoặc mạng internet của bạn.';
    }
  };

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('giá') || text.includes('bao nhiêu') || text.includes('tiền') || text.includes('mua')) {
      return 'HelioWatch Gen 3 hiện đang có mức giá bán ưu đãi đặt trước là 9,990,000đ (giá gốc niêm yết là 12,000,000đ), tiết kiệm ngay 17%. Bạn có thể tùy biến các loại dây đeo thể thao hoặc da/titanium trực tiếp trên web nữa đấy!';
    }
    if (text.includes('pin') || text.includes('sạc') || text.includes('dùng bao lâu')) {
      return 'HelioWatch Gen 3 sở hữu thời lượng pin cực ấn tượng: dùng liên tục tới 7 ngày ở chế độ thường, và lên đến 14 ngày ở chế độ tiết kiệm pin. Đồng hồ hỗ trợ sạc từ tính không dây siêu nhanh, chỉ mất 45 phút để sạc đầy 80% pin.';
    }
    if (text.includes('nước') || text.includes('bơi') || text.includes('tắm') || text.includes('chống nước')) {
      return 'HelioWatch Gen 3 đạt tiêu chuẩn kháng nước 5ATM vượt trội theo chuẩn ISO 22810:2010, cho phép chịu áp suất nước ở độ sâu 50 mét. Bạn có thể thoải mái đeo khi đi mưa, tắm bồn, bơi lội hoặc chơi các môn thể thao dưới nước.';
    }
    if (text.includes('khuyến mãi') || text.includes('ưu đãi') || text.includes('quà') || text.includes('tặng') || text.includes('đăng ký')) {
      return 'Khi đăng ký nhận thông tin sớm hôm nay, bạn sẽ nhận được các đặc quyền độc quyền mở bán sớm gồm: 1) Mã giảm giá 15% trực tiếp khi mua; 2) Bộ quà tặng trị giá 2,000,000đ gồm Dây da Ý cao cấp và Củ sạc nhanh GaN 35W; 3) Nâng cấp gói bảo hành vàng 24 tháng 1 đổi 1.';
    }
    if (text.includes('sức khỏe') || text.includes('đo') || text.includes('tim') || text.includes('ecg') || text.includes('oxy') || text.includes('huyết áp') || text.includes('nhiệt độ')) {
      return 'Đồng hồ được tích hợp hệ thống cảm biến sinh học tân tiến nhất: cảm biến điện học tim (ECG) đo điện tâm đồ, cảm biến nhịp tim quang học 24/7, cảm biến đo nồng độ oxy trong máu SpO2, đo nhiệt độ da và theo dõi chuyên sâu giấc ngủ 4 chu kỳ.';
    }
    if (text.includes('kính') || text.includes('vỏ') || text.includes('chất liệu') || text.includes('titan') || text.includes('sapphire')) {
      return 'HelioWatch Gen 3 sử dụng chất liệu siêu bền bỉ: Thân vỏ làm hoàn toàn từ Titanium cấp hàng không vũ trụ siêu nhẹ và cứng cáp, kết hợp mặt kính tinh thể Sapphire chống trầy xước tuyệt đối và mặt lưng gốm tráng gương tương thích sinh học, thân thiện với làn da.';
    }
    if (text.includes('size') || text.includes('kích thước') || text.includes('nặng') || text.includes('gam')) {
      return 'Sản phẩm có 2 phiên bản kích thước mặt là 41mm (nặng 38g) và 45mm (nặng 45g), thiết kế công thái học siêu ôm tay, phù hợp cho cả nam và nữ hoạt động thể thao suốt ngày dài.';
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('chào') || text.includes('alo')) {
      return 'Xin chào! Tôi có thể hỗ trợ gì cho bạn về dòng đồng hồ thông minh Titanium HelioWatch Gen 3 hôm nay?';
    }

    return 'Cảm ơn câu hỏi của bạn. HelioWatch Gen 3 là dòng đồng hồ thông minh Titanium cao cấp chăm sóc sức khỏe chủ động của Helicorp, tích hợp ECG đo điện tim, kháng nước 5ATM, pin 7 ngày và định vị GPS kép. Bạn cần tư vấn sâu hơn về tính năng phần cứng, mức giá hay các ưu đãi mở bán sớm?';
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    trackEvent(`Gửi câu hỏi chatbot: ${textToSend}`, 'Chatbot', 'Message Send');

    if (apiKey) {
      const responseText = await fetchGeminiResponse(textToSend, [...messages, userMessage]);
      const botMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } else {
      setTimeout(() => {
        const responseText = getBotResponse(textToSend);
        const botMessage: Message = {
          id: Math.random().toString(36).substring(2, 9),
          sender: 'bot',
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const quickSuggestions = [
    'Giá bao nhiêu?',
    'Pin dùng bao lâu?',
    'Có kháng nước không?',
    'Ưu đãi đăng ký sớm?'
  ];

  return (
    <>
      <button 
        className={`chatbot-float-btn ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Mở cửa sổ tư vấn trực tuyến"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      <div className={`chatbot-window-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="chatbot-header">
          <div className="bot-profile-info">
            <div className="bot-avatar">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="bot-name">Helio Assistant</h3>
              <span className="bot-status">
                {apiKey ? 'Trực tuyến (Gemini AI)' : 'Trực tuyến (Tự động)'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                setTempKey(apiKey);
                setShowSettings(!showSettings);
              }}
              className="chatbot-header-close-btn"
              title="Cấu hình API Gemini"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={handleToggle}
              className="chatbot-header-close-btn"
              aria-label="Đóng chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showSettings ? (
          <div className="chatbot-settings-panel">
            <h4 className="settings-title">Cài đặt Gemini API</h4>
            <p className="settings-desc">
              Nhập API Key cá nhân của bạn để trò chuyện trực tiếp với AI thông minh về HelioWatch Gen 3.
            </p>
            <div className="settings-field">
              <label>Gemini API Key</label>
              <input
                type="password"
                placeholder="Nhập AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="chatbot-textbox"
              />
            </div>
            <p className="settings-note">
              * API Key được lưu trên trình duyệt của bạn (localStorage) và chỉ gửi trực tiếp đến endpoint Google.
            </p>
            <div className="settings-actions">
              <button onClick={handleSaveSettings} className="settings-save-btn">
                Lưu cấu hình
              </button>
              {apiKey && (
                <button onClick={handleResetSettings} className="settings-reset-btn" title="Xóa Key">
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setShowSettings(false)} className="settings-cancel-btn">
                Quay lại
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="chatbot-messages-body custom-chatbot-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble-row ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="msg-avatar">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="msg-bubble-content">
                    <p className="msg-text">{msg.text}</p>
                    <span className="msg-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message-bubble-row bot">
                  <div className="msg-avatar">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="msg-bubble-content typing">
                    <div className="typing-dots-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-quick-replies">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="quick-reply-btn"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="chatbot-input-footer">
              <input
                type="text"
                className="chatbot-textbox"
                placeholder="Nhập câu hỏi tại đây..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button
                className="chatbot-send-btn"
                onClick={() => handleSend(input)}
                disabled={isTyping || !input.trim()}
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .chatbot-float-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #000000;
          color: #ffffff;
          border: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme='dark'] .chatbot-float-btn {
          background-color: #ffffff;
          color: #000000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .chatbot-float-btn:hover {
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
        }

        .chatbot-float-btn:active {
          transform: scale(0.95);
        }

        .chatbot-window-panel {
          position: fixed;
          bottom: 92px;
          right: 24px;
          width: 360px;
          height: 480px;
          max-height: calc(100vh - 120px);
          max-width: calc(100vw - 48px);
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          z-index: 998;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border-color);
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme='dark'] .chatbot-window-panel {
          background-color: #161616;
          border-color: #262626;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .chatbot-window-panel.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
        }

        .bot-profile-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bot-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [data-theme='dark'] .bot-avatar {
          background-color: #ffffff;
        }

        [data-theme='dark'] .bot-avatar svg {
          color: #000000;
        }

        .bot-name {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 2px 0;
        }

        .bot-status {
          font-size: 0.68rem;
          color: #10b981;
          display: block;
          font-weight: 500;
        }

        .chatbot-header-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .chatbot-header-close-btn:hover {
          color: var(--text-primary);
        }

        .chatbot-messages-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .custom-chatbot-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-chatbot-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-chatbot-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .message-bubble-row {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }

        .message-bubble-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-bubble-row.bot {
          align-self: flex-start;
        }

        .msg-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .msg-bubble-content {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .message-bubble-row.user .msg-bubble-content {
          background-color: #000000;
          color: #ffffff;
          border: none;
          border-bottom-right-radius: 2px;
        }

        [data-theme='dark'] .message-bubble-row.user .msg-bubble-content {
          background-color: #ffffff;
          color: #000000;
        }

        .message-bubble-row.bot .msg-bubble-content {
          border-bottom-left-radius: 2px;
        }

        .msg-text {
          font-size: 0.85rem;
          line-height: 1.45;
          margin: 0;
          white-space: pre-wrap;
          font-weight: 500;
        }

        .msg-time {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          align-self: flex-end;
        }

        .message-bubble-row.user .msg-time {
          color: rgba(255, 255, 255, 0.6);
        }

        [data-theme='dark'] .message-bubble-row.user .msg-time {
          color: rgba(0, 0, 0, 0.5);
        }

        .chatbot-quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 10px 20px;
          border-top: 1px solid var(--border-color);
        }

        .quick-reply-btn {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          padding: 6px 12px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-reply-btn:hover {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        .chatbot-input-footer {
          display: flex;
          padding: 14px 20px;
          border-top: 1px solid var(--border-color);
          gap: 10px;
          align-items: center;
        }

        .chatbot-textbox {
          flex-grow: 1;
          height: 38px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          padding: 0 12px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--text-primary);
          font-weight: 600;
          transition: all 0.2s;
        }

        .chatbot-textbox:focus {
          outline: none;
          border-color: var(--text-primary);
          background-color: var(--bg-primary);
        }

        .chatbot-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: none;
          background-color: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }

        [data-theme='dark'] .chatbot-send-btn {
          background-color: #ffffff;
          color: #000000;
        }

        .chatbot-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .chatbot-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .typing-dots-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 12px;
        }

        .typing-dots-indicator .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-secondary);
          animation: typingPulseDot 1.4s infinite ease-in-out;
        }

        .typing-dots-indicator .dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots-indicator .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingPulseDot {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chatbot-settings-panel {
          flex-grow: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background-color: var(--surface-primary);
        }

        .settings-title {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }

        .settings-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        .settings-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .settings-field label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .settings-note {
          font-size: 0.72rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .settings-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .settings-save-btn {
          flex: 2;
          height: 38px;
          background-color: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        [data-theme='dark'] .settings-save-btn {
          background-color: #ffffff;
          color: #000000;
        }

        .settings-save-btn:hover {
          opacity: 0.9;
        }

        .settings-reset-btn {
          width: 38px;
          height: 38px;
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--brand-error);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .settings-reset-btn:hover {
          background-color: var(--brand-error);
          color: #ffffff;
        }

        .settings-cancel-btn {
          flex: 1.2;
          height: 38px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .settings-cancel-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        @media (max-width: 576px) {
          .chatbot-window-panel {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            max-height: 100vh;
            max-width: 100vw;
            border-radius: 0;
            border: none;
            z-index: 10000;
            transform: translateY(100%);
          }

          .chatbot-window-panel.is-open {
            transform: translateY(0);
          }

          .chatbot-float-btn {
            bottom: 16px;
            right: 16px;
          }

          .chatbot-float-btn.active {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }

          .chatbot-messages-body {
            padding: 16px;
          }

          .chatbot-header {
            padding: 12px 16px;
          }

          .chatbot-input-footer {
            padding: 12px 16px;
          }
        }
      `}</style>
    </>
  );
};
