import React, { useState } from 'react';
import { Cpu, Shield, Bluetooth, Sparkles } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';

interface SpecRow {
  label: string;
  value: string;
}

interface SpecCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  specs: SpecRow[];
}

export const SpecsTable: React.FC = () => {
  const { trackEvent } = useTracking();
  const [activeTab, setActiveTab] = useState('hardware');

  const categories: SpecCategory[] = [
    {
      id: 'hardware',
      title: 'Thiết kế & Phần cứng',
      icon: <Shield size={18} />,
      specs: [
        { label: 'Chất liệu vỏ ngoài', value: 'Titan nguyên khối (vỏ siêu bền)' },
        { label: 'Lớp lót bên trong', value: 'Chất nhựa sinh học không gây dị ứng cấp y tế' },
        { label: 'Bề rộng nhẫn', value: '7.9 mm' },
        { label: 'Độ dày nhẫn', value: '2.8 mm' },
        { label: 'Trọng lượng', value: '2.4g - 3.0g (Tùy kích thước nhẫn từ size 6 đến 13)' },
        { label: 'Kích cỡ sẵn có', value: 'Đầy đủ các size từ 6, 7, 8, 9, 10, 11, 12, 13' },
      ]
    },
    {
      id: 'sensors',
      title: 'Cảm biến & Công nghệ',
      icon: <Cpu size={18} />,
      specs: [
        { label: 'Cảm biến tim mạch', value: 'Đèn LED quang học kép màu Đỏ & Hồng ngoại' },
        { label: 'Biến thiên nhịp tim', value: 'Đo lường biến thiên nhịp tim HRV có độ trễ cực thấp' },
        { label: 'Cảm biến nhiệt độ', value: 'Nhiệt kế hồng ngoại đo trực tiếp trên da ngón tay' },
        { label: 'Theo dõi vận động', value: 'Cảm biến gia tốc 3 trục có độ phân giải cao' },
        { label: 'Cảm biến nồng độ oxy', value: 'Cảm biến SpO2 theo dõi mức bão hòa oxy trong máu' },
        { label: 'Xử lý dữ liệu', value: 'Bộ xử lý ARM Cortex-M4 siêu tiết kiệm điện năng' },
      ]
    },
    {
      id: 'battery',
      title: 'Pin & Kết nối',
      icon: <Bluetooth size={18} />,
      specs: [
        { label: 'Thời lượng pin', value: 'Lên tới 7 ngày sử dụng liên tục cho mỗi lần sạc đầy' },
        { label: 'Công nghệ pin', value: 'Pin Lithium Polymer sạc lại (dung lượng 15-22mAh)' },
        { label: 'Phương thức sạc', value: 'Bộ sạc không dây chuyên dụng cổng USB-C đi kèm' },
        { label: 'Thời gian sạc', value: 'Khoảng 80 phút từ 0% lên tới 100%' },
        { label: 'Chuẩn kết nối', value: 'Bluetooth Low Energy (BLE 5.0) tự động đồng bộ' },
        { label: 'Ứng dụng di động', value: 'HelioApp hỗ trợ cả hai hệ điều hành iOS & Android' },
        { label: 'Tương thích dữ liệu', value: 'Đồng bộ trực tiếp Apple Health và Google Fit' },
      ]
    }
  ];

  const handleTabChange = (tabId: string, tabName: string) => {
    setActiveTab(tabId);
    trackEvent(`Chuyển tab thông số kỹ thuật: ${tabName}`, 'Specs Section', 'Tab Click');
  };

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section id="specs" className="specs-section">
      <div className="container">
        <h2 className="title-section">
          Chi tiết <span>Thông số</span> Kỹ thuật
        </h2>
        <p className="specs-desc">
          Mọi chi tiết thiết kế đều được tính toán chuẩn xác đến từng micron để mang lại trải nghiệm đeo thoải mái nhất cùng độ bền bỉ đáng kinh ngạc.
        </p>

        <div className="specs-container-box glass-panel">
          <div className="specs-tabs-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`spec-tab-btn ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => handleTabChange(category.id, category.title)}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          <div className="specs-content-panel animate-fade-in" key={activeTab}>
            <div className="specs-table-grid">
              {activeCategory.specs.map((spec, index) => (
                <div key={index} className="specs-table-row">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="specs-note-panel">
              <Sparkles size={16} className="note-icon" />
              <span>* HelioRing hoàn toàn thân thiện với làn da nhạy cảm. Thân vỏ Titanium đạt tiêu chuẩn hàng không có đặc tính chống xước, chống hóa chất tẩy rửa mạnh.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .specs-section {
          padding: 8rem 0;
          background-color: var(--bg-secondary);
          transition: background-color 0.3s ease;
          position: relative;
        }

        .specs-desc {
          text-align: center;
          color: var(--text-secondary);
          max-width: 650px;
          margin: -2rem auto 4.5rem;
          font-size: 1.1rem;
        }

        .specs-container-box {
          border-radius: 24px;
          overflow: hidden;
          background-color: var(--surface-primary);
        }

        .specs-tabs-list {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.01);
        }

        .spec-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 1.5rem 1rem;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-bottom: 3px solid transparent;
          transition: var(--transition-fast);
        }

        .spec-tab-btn:hover {
          color: var(--text-primary);
          background-color: rgba(0,0,0,0.02);
        }

        .spec-tab-btn.active {
          color: var(--text-primary);
          border-bottom-color: var(--text-primary);
          background-color: var(--surface-primary);
        }

        .specs-content-panel {
          padding: 3rem;
        }

        .specs-table-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0px;
        }

        .specs-table-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border-color);
          align-items: center;
        }

        .specs-table-row:last-child {
          border-bottom: none;
        }

        .spec-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .spec-value {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .specs-note-panel {
          margin-top: 2.5rem;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 1rem 1.25rem;
          background-color: var(--bg-primary);
          border-radius: 12px;
          font-size: 0.825rem;
          color: var(--text-tertiary);
          border-left: 3px solid var(--primary-gold);
        }

        .note-icon {
          color: var(--primary-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .specs-tabs-list {
            flex-direction: column;
          }

          .spec-tab-btn {
            border-bottom: none;
            border-left: 3px solid transparent;
            justify-content: flex-start;
            padding: 1rem 1.5rem;
          }

          .spec-tab-btn.active {
            border-left-color: var(--text-primary);
          }

          .specs-content-panel {
            padding: 1.5rem;
          }

          .specs-table-row {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 1rem 0;
          }
        }
      `}</style>
    </section>
  );
};
