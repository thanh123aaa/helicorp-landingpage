import React, { useState } from 'react';
import { useTracking } from '../hooks/useTracking';
import { Check, Shield, Cpu, Zap } from 'lucide-react';

export const SpecsTable: React.FC = () => {
  const { trackEvent } = useTracking();
  const [activeTab, setActiveTab] = useState<'hardware' | 'health' | 'battery'>('hardware');

  const handleTabChange = (tab: 'hardware' | 'health' | 'battery') => {
    setActiveTab(tab);
    trackEvent(`Xem tab thông số kỹ thuật: ${tab}`, 'Specs Section', 'Tab Button Click');
  };

  const hardwareSpecs = [
    { name: "Chất liệu thân vỏ", value: "Titanium cấp hàng không vũ trụ cao cấp" },
    { name: "Mặt kính màn hình", value: "Tinh thể Sapphire chống trầy xước" },
    { name: "Màn hình hiển thị", value: "AMOLED 1.96-inch Always-on Display, 2000 nits" },
    { name: "Trọng lượng vỏ", value: "Size 41mm: 38g | Size 45mm: 45g" },
    { name: "Chất liệu dây đeo", value: "Silicon Fluoroelastomer, Da Ý hoặc Titanium cao cấp" },
    { name: "Độ phân giải", value: "410 x 502 pixels (332 ppi)" }
  ];

  const healthSpecs = [
    { name: "Cảm biến tim mạch", value: "Cảm biến điện học tim (ECG) & Cảm biến nhịp tim quang học thế hệ mới" },
    { name: "Cảm biến môi trường", value: "Cảm biến nhiệt độ cơ thể, Cảm biến ánh sáng môi trường" },
    { name: "Theo dõi hô hấp", value: "Cảm biến đo nồng độ oxy trong máu SpO2 tự động" },
    { name: "Định vị vị trí", value: "GPS đa băng tần băng kép (L1+L5), GLONASS, Galileo" },
    { name: "Theo dõi giấc ngủ", value: "Phân tích 4 chu kỳ ngủ và đo nhịp thở khi ngủ" },
    { name: "Phát hiện sự cố", value: "Cảm biến gia tốc lực cao (phát hiện ngã, va chạm xe)" }
  ];

  const batterySpecs = [
    { name: "Thời lượng pin", value: "Chế độ thường: 7 ngày | Chế độ tiết kiệm: 14 ngày" },
    { name: "Công nghệ sạc", value: "Sạc từ tính không dây, sạc nhanh 45 phút được 80% pin" },
    { name: "Chuẩn chống nước", value: "5ATM (kháng nước độ sâu lên tới 50 mét)" },
    { name: "Chuẩn Bluetooth", value: "Bluetooth 5.3 Low Energy ổn định, kết nối xa" },
    { name: "Khả năng tương thích", value: "iOS 15.0 trở lên & Android 9.0 trở lên" },
    { name: "Bộ nhớ trong", value: "32GB (lưu trữ nhạc ngoại tuyến)" }
  ];

  const renderSpecs = () => {
    const specs = activeTab === 'hardware' 
      ? hardwareSpecs 
      : activeTab === 'health' 
        ? healthSpecs 
        : batterySpecs;

    return (
      <div className="specs-list-wrapper animate-fade-in" key={activeTab}>
        {specs.map((spec, index) => (
          <div key={index} className="spec-row-item">
            <span className="spec-name">{spec.name}</span>
            <span className="spec-value">{spec.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="specs" className="specs-section">
      <div className="container">
        <h2 className="title-section">
          Thông số <span>Kỹ thuật</span> đỉnh cao
        </h2>
        
        <div className="specs-container-grid">
          {/* Left Column: Specs Tabs and Table */}
          <div className="specs-table-panel glass-panel">
            <div className="specs-tabs-row">
              <button 
                className={`tab-btn-item ${activeTab === 'hardware' ? 'active' : ''}`}
                onClick={() => handleTabChange('hardware')}
              >
                <Cpu size={16} /> Thiết kế & Phần cứng
              </button>
              <button 
                className={`tab-btn-item ${activeTab === 'health' ? 'active' : ''}`}
                onClick={() => handleTabChange('health')}
              >
                <Shield size={16} /> Sức khỏe & Cảm biến
              </button>
              <button 
                className={`tab-btn-item ${activeTab === 'battery' ? 'active' : ''}`}
                onClick={() => handleTabChange('battery')}
              >
                <Zap size={16} /> Pin & Kết nối
              </button>
            </div>
            
            {renderSpecs()}
          </div>

          {/* Right Column: Visual highlights checklist */}
          <div className="specs-highlights-panel glass-panel">
            <h3>Chứng nhận tiêu chuẩn</h3>
            <div className="highlights-list">
              <div className="highlight-item">
                <div className="check-icon-box"><Check size={16} /></div>
                <div>
                  <h4>Độ bền chuẩn quân đội</h4>
                  <p>Đáp ứng các tiêu chuẩn nghiêm ngặt về chống va đập, nhiệt độ khắc nghiệt và cát bụi.</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="check-icon-box"><Check size={16} /></div>
                <div>
                  <h4>Kháng nước ISO 22810</h4>
                  <p>Cho phép lặn biển nông và tham gia các hoạt động dưới nước cường độ cao.</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="check-icon-box"><Check size={16} /></div>
                <div>
                  <h4>Vật liệu thân thiện y tế</h4>
                  <p>Lớp vỏ Titanium và mặt lưng gốm tráng gương hoàn toàn không gây dị ứng hay kích ứng da.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .specs-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
        }

        .specs-container-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2rem;
          margin-top: 3.5rem;
          align-items: stretch;
        }

        .specs-table-panel {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2.5rem;
        }

        .specs-tabs-row {
          display: flex;
          gap: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
        }

        .tab-btn-item {
          padding: 0.8rem 1.2rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
        }

        .tab-btn-item:hover {
          color: var(--text-primary);
          background-color: var(--border-color);
        }

        .tab-btn-item.active {
          background-color: var(--text-primary);
          color: var(--bg-primary);
        }

        .spec-row-item {
          display: flex;
          justify-content: space-between;
          padding: 1.2rem 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
          gap: 2rem;
        }

        .spec-row-item:last-child {
          border-bottom: none;
        }

        .spec-name {
          font-weight: 700;
          color: var(--text-primary);
          min-width: 180px;
        }

        .spec-value {
          color: var(--text-secondary);
          text-align: right;
        }

        /* Highlights panel */
        .specs-highlights-panel {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .specs-highlights-panel h3 {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .highlight-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .check-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--brand-success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .highlight-item h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .highlight-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 992px) {
          .specs-container-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .specs-table-panel {
            padding: 1.5rem;
          }

          .spec-row-item {
            flex-direction: column;
            gap: 4px;
          }

          .spec-value {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
