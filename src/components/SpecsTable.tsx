import React, { useState } from 'react';
import { useTracking } from '../hooks/useTracking';
import { Shield, Cpu, Zap, Droplets, Heart } from 'lucide-react';
import { Reveal } from './Reveal';

export const SpecsTable: React.FC = () => {
  const { trackEvent } = useTracking();
  const [activeTab, setActiveTab] = useState<'hardware' | 'health' | 'battery'>('hardware');
  const [activeHighlight, setActiveHighlight] = useState<number>(0); // Default to first certification

  const handleTabChange = (tab: 'hardware' | 'health' | 'battery') => {
    setActiveTab(tab);
    trackEvent(`Xem tab thông số kỹ thuật: ${tab}`, 'Specs Section', 'Tab Button Click');
  };

  const handleHighlightSelect = (index: number, name: string) => {
    setActiveHighlight(index);
    trackEvent(`Chọn chứng nhận: ${name}`, 'Specs Section', 'Highlight Orbit Hover/Click');
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

  const certifications = [
    {
      num: "01",
      title: "Độ bền Chuẩn Quân Đội MIL-STD-810H",
      description: "Thiết bị đã xuất sắc vượt qua chuỗi 29 thử nghiệm va đập mạnh, chấn động tần số cao, áp suất chênh lệch và dải nhiệt sinh tồn từ -20°C đến 55°C.",
      icon: <Shield size={16} />,
      color: "#10b981", // Emerald
      rgb: "16, 185, 129",
      bgLight: "rgba(16, 185, 129, 0.08)"
    },
    {
      num: "02",
      title: "Kháng Nước Vượt Trội ISO 22810:2010",
      description: "Thiết kế kháng nước sâu đến 50 mét (5ATM), cho phép người dùng tự do tham gia bơi lội, lướt ván hay các môn thể thao dưới nước tốc độ cao.",
      icon: <Droplets size={16} />,
      color: "#3b82f6", // Blue
      rgb: "59, 130, 246",
      bgLight: "rgba(59, 130, 246, 0.08)"
    },
    {
      num: "03",
      title: "Vật Liệu Tương Thích Sinh Học Cao Cấp",
      description: "Sự kết hợp giữa Titanium Grade 5 siêu nhẹ và mặt lưng gốm tráng gương sinh học giúp loại bỏ 100% nguy cơ kích ứng da, an toàn tuyệt đối khi đeo 24/7.",
      icon: <Heart size={16} />,
      color: "#ec4899", // Pink
      rgb: "236, 72, 153",
      bgLight: "rgba(236, 72, 153, 0.08)"
    }
  ];

  const renderSpecs = () => {
    const specs = activeTab === 'hardware' 
      ? hardwareSpecs 
      : activeTab === 'health' 
        ? healthSpecs 
        : batterySpecs;

    return (
      <div className="specs-list-wrapper" key={activeTab}>
        {specs.map((spec, index) => (
          <div key={index} className="spec-row-item" style={{ animationDelay: `${index * 50}ms` }}>
            <span className="spec-name">{spec.name}</span>
            <span className="spec-value">{spec.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // SVG circular properties
  const radius = 72;
  const cx = 110;
  const cy = 110;

  // Polar coordinates calculation for icons
  const getIconCoords = (index: number) => {
    const angles = [-30, 90, 210]; // mid-angles of segments in degrees
    const rad = (angles[index] * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);
    return { x, y };
  };

  const activeCert = certifications[activeHighlight];

  return (
    <section id="specs" className="specs-section">
      <div className="container">
        
        {/* Title */}
        <h2 className="specs-main-title">
          Thông số <span>Kỹ thuật</span> đỉnh cao
        </h2>
        
        <Reveal>
          <div className="specs-container-grid">
          
          {/* ── LEFT COLUMN: Spec Sheet (Classic Table Style) ── */}
          <div className="specs-table-panel glass-panel">
            
            {/* Sliding Tab Segmented Switcher */}
            <div className="specs-tabs-switcher">
              <div 
                className="tabs-active-indicator" 
                style={{
                  left: activeTab === 'hardware' ? '2px' : activeTab === 'health' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 2px)',
                  width: 'calc(33.33% - 4px)'
                }}
              />
              <button 
                className={`tab-switch-btn ${activeTab === 'hardware' ? 'active' : ''}`}
                onClick={() => handleTabChange('hardware')}
              >
                <Cpu size={14} /> <span>Thiết kế & Phần cứng</span>
              </button>
              <button 
                className={`tab-switch-btn ${activeTab === 'health' ? 'active' : ''}`}
                onClick={() => handleTabChange('health')}
              >
                <Shield size={14} /> <span>Sức khỏe & Cảm biến</span>
              </button>
              <button 
                className={`tab-switch-btn ${activeTab === 'battery' ? 'active' : ''}`}
                onClick={() => handleTabChange('battery')}
              >
                <Zap size={14} /> <span>Pin & Kết nối</span>
              </button>
            </div>
            
            {/* Spec items list */}
            {renderSpecs()}
          </div>

          {/* ── RIGHT COLUMN: Planet Concentric Orbit Radar Dashboard ── */}
          <div className="specs-highlights-panel glass-panel">
            
            <div className="highlights-dashboard-header">
              <h3 className="highlights-header">Chứng nhận tiêu chuẩn</h3>
            </div>
            
            <div className="highlights-split-layout">
              
              {/* Left inside panel: Concentric Orbit Rings SVG */}
              <div className="cert-circular-dashboard">
                <svg className="cert-donut-svg" width="220" height="220" viewBox="0 0 220 220">
                  
                  {/* concentric ring 1: Inner small dashed orbit */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="45" 
                    fill="none" 
                    style={{ stroke: 'var(--border-color)' }}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.3"
                  />

                  {/* concentric ring 2 glow: Middle orbit glow */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={radius} 
                    fill="none" 
                    style={{ 
                      stroke: activeCert.color, 
                      transition: 'stroke 0.4s ease, filter 0.4s ease',
                      filter: `drop-shadow(0 0 8px ${activeCert.color})`
                    }}
                    strokeWidth="6"
                    opacity="0.15"
                  />

                  {/* concentric ring 2: Main orbit ring – animated spin */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={radius} 
                    fill="none" 
                    className="orbit-ring-main"
                    style={{ 
                      stroke: activeCert.color,
                      transition: 'stroke 0.4s ease',
                      filter: `drop-shadow(0 0 4px ${activeCert.color})`
                    }}
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    opacity="0.9"
                  />

                  {/* concentric ring 3: Outer dashed orbit */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="92" 
                    fill="none" 
                    style={{ stroke: 'var(--border-color)' }}
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    opacity="0.25"
                  />

                  {/* concentric ring 4: Outermost thin solid border */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="105" 
                    fill="none" 
                    style={{ stroke: 'var(--border-color)' }}
                    strokeWidth="0.75"
                    opacity="0.15"
                  />
                  
                  {/* Concentric glowing target ring around the ACTIVE icon */}
                  {(() => {
                    const activeCoords = getIconCoords(activeHighlight);
                    return (
                      <>
                        {/* Outer glow ring */}
                        <circle
                          cx={activeCoords.x}
                          cy={activeCoords.y}
                          r="34"
                          fill="none"
                          style={{ 
                            stroke: activeCert.color, 
                            opacity: 0.2,
                            transition: 'stroke 0.4s'
                          }}
                          strokeWidth="8"
                        />
                        {/* Pulsing ring */}
                        <circle
                          cx={activeCoords.x}
                          cy={activeCoords.y}
                          r="28"
                          fill="none"
                          style={{ 
                            stroke: activeCert.color,
                            filter: `drop-shadow(0 0 6px ${activeCert.color})`,
                            transition: 'stroke 0.4s'
                          }}
                          strokeWidth="2"
                          className="active-target-ring"
                        />
                      </>
                    );
                  })()}

                  {/* Render the Lucide icons inside the segments */}
                  {certifications.map((cert, index) => {
                    const coords = getIconCoords(index);
                    const isActive = activeHighlight === index;
                    const ICON_R = 22; // icon circle radius
                    return (
                      <g 
                        key={index} 
                        transform={`translate(${coords.x - ICON_R}, ${coords.y - ICON_R})`}
                        className="pointer-events-none"
                      >
                        {/* Soft glow backdrop */}
                        {isActive && (
                          <circle 
                            cx={ICON_R}
                            cy={ICON_R}
                            r={ICON_R + 6}
                            fill={cert.color}
                            opacity="0.18"
                          />
                        )}
                        {/* Main icon circle */}
                        <circle 
                          cx={ICON_R}
                          cy={ICON_R}
                          r={ICON_R}
                          fill={isActive ? cert.color : 'var(--surface-secondary)'}
                          style={{ 
                            stroke: isActive ? cert.color : 'var(--border-color)',
                            strokeWidth: isActive ? '2px' : '1.5px',
                            transition: 'fill 0.4s, stroke 0.4s', 
                            filter: isActive ? `drop-shadow(0 6px 14px ${cert.color}70)` : 'none' 
                          }}
                        />
                        {/* Icon (24px, centered) */}
                        <g 
                          transform={`translate(${ICON_R - 12}, ${ICON_R - 12})`}
                          style={{ color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'color 0.4s' }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {index === 0 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                            {index === 1 && <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></>}
                            {index === 2 && <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>}
                          </svg>
                        </g>
                      </g>
                    );
                  })}
                  
                  {/* Center core pulse */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="20" 
                    fill="none"
                    style={{ 
                      stroke: activeCert.color,
                      opacity: 0.15,
                      transition: 'stroke 0.4s'
                    }}
                    strokeWidth="8"
                  />
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="13" 
                    fill="var(--surface-secondary)"
                    style={{ stroke: activeCert.color, strokeWidth: '1.5px', transition: 'stroke 0.4s' }}
                  />
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="6" 
                    fill={activeCert.color}
                    style={{ transition: 'fill 0.4s', filter: `drop-shadow(0 0 8px ${activeCert.color})` }}
                  />

                  {/* ──── INVISIBLE INTERACTIVE HIT TARGETS ──── */}
                  {certifications.map((cert, index) => {
                    const coords = getIconCoords(index);
                    return (
                      <circle
                        key={index}
                        cx={coords.x}
                        cy={coords.y}
                        r="30"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleHighlightSelect(index, cert.title)}
                        onMouseEnter={() => handleHighlightSelect(index, cert.title)}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Right inside panel: Beautiful cloud details popover bubble */}
              <div className="cert-details-side-panel">
                <div className="cert-cloud-shadow-wrapper" key={activeHighlight}>
                  <div 
                    className="cert-side-details-card-cloud animate-fade-in"
                    style={{ 
                      '--accent-color': activeCert.color,
                      '--accent-rgb': activeCert.rgb
                    } as React.CSSProperties}
                  >
                    <div className="details-huge-num">{activeCert.num}</div>
                    <h4 className="details-title-minimal">{activeCert.title}</h4>
                    <p className="details-desc-minimal">{activeCert.description}</p>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
          
          </div>
        </Reveal>
      </div>

      <style>{`
        /* ── SECTION ── */
        .specs-section {
          padding: 120px 0 100px;
          background-color: var(--bg-primary);
          transition: background 0.5s ease;
        }

        .specs-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.4rem, 3.8vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 64px;
        }

        .specs-main-title span {
          color: var(--primary-gold);
        }

        /* ── GRID LAYOUT ── */
        .specs-container-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: stretch;
        }

        /* ── LEFT COLUMN: TECH SPEC TABLE ── */
        .specs-table-panel {
          background-color: var(--surface-secondary);
          border-radius: 28px;
          padding: 40px;
          border: none;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Sliding Tab Switcher */
        .specs-tabs-switcher {
          position: relative;
          display: flex;
          background: var(--bg-primary);
          border-radius: 100px;
          padding: 2px;
          height: 52px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .tabs-active-indicator {
          position: absolute;
          top: 2px;
          bottom: 2px;
          background: var(--text-primary);
          border-radius: 100px;
          transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .tab-switch-btn {
          position: relative;
          z-index: 2;
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          border-radius: 100px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.4s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 16px;
        }

        .tab-switch-btn.active {
          color: var(--bg-primary);
        }

        /* Spec Rows styling */
        .specs-list-wrapper {
          display: flex;
          flex-direction: column;
        }

        .spec-row-item {
          display: flex;
          justify-content: space-between;
          padding: 20px 8px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
          gap: 32px;
          transition: transform 0.3s ease, background 0.3s;
          border-radius: 8px;
          animation: specRowFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes specRowFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .spec-row-item:hover {
          transform: translateX(6px);
          background: rgba(0, 0, 0, 0.01);
        }

        [data-theme='dark'] .spec-row-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .spec-row-item:last-child {
          border-bottom: none;
        }

        .spec-name {
          font-family: var(--font-sans);
          font-weight: 700;
          color: var(--text-primary);
          min-width: 180px;
          transition: color 0.3s;
        }

        .spec-row-item:hover .spec-name {
          color: var(--primary-gold);
        }

        .spec-value {
          color: var(--text-secondary);
          text-align: right;
          font-weight: 500;
          line-height: 1.4;
        }

        /* ── RIGHT COLUMN: INTERACTIVE CERTIFICATIONS HIGHLIGHTS ── */
        .specs-highlights-panel {
          background-color: var(--surface-secondary);
          border-radius: 28px;
          padding: 40px;
          border: none;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .highlights-header {
          font-family: var(--font-sans);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin: 0;
        }

        /* Side-by-side layout (Circle on left, details on right) */
        .highlights-split-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 24px;
          align-items: center;
          margin-top: 8px;
        }

        /* Circular Donut Dashboard */
        .cert-circular-dashboard {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 220px;
          height: 220px;
        }

        .cert-donut-svg {
          overflow: visible;
        }

        /* Main orbit ring slow spin */
        .orbit-ring-main {
          transform-origin: 110px 110px;
          animation: orbitSpin 20s linear infinite;
        }

        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Glowing radar outer target ring around ACTIVE icon */
        .active-target-ring {
          animation: activeTargetPulse 2s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes activeTargetPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.12); opacity: 0.4; }
        }

        /* Side details panel */
        .cert-details-side-panel {
          flex-grow: 1;
        }

        /* Speech bubble wrapper – clean drop shadow */
        .cert-cloud-shadow-wrapper {
          display: flex;
          flex-grow: 1;
          position: relative;
        }

        /* ── SPEECH BUBBLE CARD ── */
        .cert-side-details-card-cloud {
          position: relative;
          background: var(--surface-secondary);
          border: 1.5px solid var(--border-color);
          border-top: 3px solid var(--accent-color);
          border-radius: 20px;
          padding: 24px 26px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 200px;
          justify-content: center;
          margin-left: 16px;
          margin-top: 0;
          z-index: 1;
          width: 100%;
          box-shadow:
            0 8px 30px rgba(var(--accent-rgb), 0.08),
            0 2px 8px rgba(0,0,0,0.04);
        }

        [data-theme='dark'] .cert-side-details-card-cloud {
          box-shadow:
            0 0 0 1px rgba(var(--accent-rgb), 0.12),
            0 12px 40px rgba(0,0,0,0.35),
            0 0 20px rgba(var(--accent-rgb), 0.08);
          border-color: rgba(var(--accent-rgb), 0.2);
        }

        /* Left-pointing arrow */
        .cert-side-details-card-cloud::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 18px;
          height: 18px;
          background: var(--surface-secondary);
          border-left: 1.5px solid var(--border-color);
          border-bottom: 1.5px solid var(--border-color);
          border-radius: 0 0 0 4px;
          z-index: 2;
          transition: border-color 0.4s, background 0.4s;
        }

        [data-theme='dark'] .cert-side-details-card-cloud::before {
          border-color: rgba(var(--accent-rgb), 0.2);
        }

        /* No ::after needed */
        .cert-side-details-card-cloud::after {
          display: none;
        }

        /* Large minimalist index watermark */
        .details-huge-num {
          font-family: var(--font-sans);
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1;
          color: var(--accent-color);
          opacity: 0.12;
          margin-bottom: -15px;
          transition: color 0.4s;
        }

        .details-title-minimal {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.35;
          z-index: 3;
        }

        .details-desc-minimal {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
          z-index: 3;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1200px) {
          .highlights-split-layout {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 32px;
          }
          .cert-side-details-card-cloud {
            margin-left: 0;
            margin-top: 0;
          }
          /* Arrow points up when stacked vertically */
          .cert-side-details-card-cloud::before {
            left: 50%;
            top: -10px;
            transform: translateX(-50%) rotate(45deg);
            border-left: 1.5px solid var(--border-color);
            border-top: 1.5px solid var(--border-color);
            border-bottom: none;
            border-right: none;
          }
        }

        @media (max-width: 992px) {
          .specs-container-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .highlights-split-layout {
            grid-template-columns: 220px 1fr;
            justify-items: stretch;
            gap: 24px;
          }
          .cert-side-details-card-cloud {
            margin-left: 16px;
            margin-top: 0;
          }
          /* Arrow points left */
          .cert-side-details-card-cloud::before {
            left: -10px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            border-left: 1.5px solid var(--border-color);
            border-bottom: 1.5px solid var(--border-color);
            border-top: none;
            border-right: none;
          }
        }

        @media (max-width: 768px) {
          .tab-switch-btn span {
            display: none;
          }
          .tab-switch-btn {
            padding: 0;
          }
        }

        @media (max-width: 576px) {
          .specs-table-panel, .specs-highlights-panel {
            padding: 24px 16px;
          }

          .spec-row-item {
            flex-direction: column;
            gap: 6px;
            padding: 16px 4px;
          }

          .spec-value {
            text-align: left;
          }

          .highlights-split-layout {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 24px;
          }
          .cert-side-details-card-cloud {
            margin-left: 0;
            margin-top: 0;
          }
          /* Arrow points up when stacked vertically */
          .cert-side-details-card-cloud::before {
            left: 50%;
            top: -10px;
            transform: translateX(-50%) rotate(45deg);
            border-left: 1.5px solid var(--border-color);
            border-top: 1.5px solid var(--border-color);
            border-bottom: none;
            border-right: none;
          }
        }
      `}</style>
    </section>
  );
};
