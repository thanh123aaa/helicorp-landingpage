import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';

interface PurchaseNotification {
  name: string;
  location: string;
  action: string;
  product: string;
  time: string;
  icon: React.ReactNode;
}

const mockNotifications: PurchaseNotification[] = [
  {
    name: 'Nguyễn Trần Khánh L.',
    location: 'Quận Bình Thạnh, Tp.HCM',
    action: 'vừa đặt mua thành công',
    product: 'HelioRing Gen 3 Stellar Silver',
    time: '2 phút trước',
    icon: <ShoppingBag size={14} />
  },
  {
    name: 'Phạm Minh H.',
    location: 'Quận Cầu Giấy, Hà Nội',
    action: 'vừa đăng ký trải nghiệm',
    product: 'HelioRing Sớm Nhất',
    time: '5 phút trước',
    icon: <Sparkles size={14} />
  },
  {
    name: 'Lê Thanh T.',
    location: 'Hải Châu, Đà Nẵng',
    action: 'đang xem chi tiết',
    product: 'HelioRing Titanium Black Size 9',
    time: 'vừa xong',
    icon: <Eye size={14} />
  },
  {
    name: 'Vũ Hoàng M.',
    location: 'Ninh Kiều, Cần Thơ',
    action: 'đã thêm vào danh sách yêu thích',
    product: 'HelioRing Royal Gold Size 10',
    time: '12 phút trước',
    icon: <Heart size={14} />
  },
  {
    name: 'Trần Thị Mỹ D.',
    location: 'Thành phố Vinh, Nghệ An',
    action: 'vừa đặt mua thành công',
    product: 'HelioRing Gen 3 Rose Quartz',
    time: '4 phút trước',
    icon: <ShoppingBag size={14} />
  }
];

export const SocialProof: React.FC = () => {
  const [currentNotif, setCurrentNotif] = useState<PurchaseNotification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 6 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 6000);

    // Set interval for subsequent notifications
    const interval = setInterval(() => {
      showRandomNotification();
    }, 20000); // Trigger every 20 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const randomIndex = Math.floor(Math.random() * mockNotifications.length);
    setCurrentNotif(mockNotifications[randomIndex]);
    setVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setVisible(false);
    }, 6000);
  };

  if (!currentNotif) return null;

  return (
    <div className={`social-proof-toast glass-panel ${visible ? 'show' : ''}`}>
      <div className="proof-icon-container">
        {currentNotif.icon}
      </div>
      <div className="proof-content">
        <p className="proof-text">
          <strong>{currentNotif.name}</strong> ở <span>{currentNotif.location}</span> {currentNotif.action}:
        </p>
        <p className="proof-product">{currentNotif.product}</p>
        <span className="proof-time">{currentNotif.time}</span>
      </div>

      <style>{`
        .social-proof-toast {
          position: fixed;
          bottom: 24px;
          left: 24px;
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 12px 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          width: 320px;
          z-index: 999;
          transform: translateY(150px);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.6s ease;
          box-shadow: var(--glass-shadow);
          pointer-events: none;
        }

        .social-proof-toast.show {
          transform: translateY(0);
          opacity: 1;
        }

        .proof-icon-container {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .proof-content {
          text-align: left;
          font-size: 0.775rem;
          line-height: 1.4;
        }

        .proof-text {
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .proof-text strong {
          color: var(--text-primary);
        }

        .proof-text span {
          color: var(--text-primary);
          font-weight: 600;
        }

        .proof-product {
          font-weight: 750;
          color: var(--primary-gold);
          margin-bottom: 2px;
        }

        .proof-time {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .social-proof-toast {
            bottom: 84px; /* Stack above mobile navigation or keep on left */
            left: 12px;
            width: calc(100vw - 24px);
            max-width: 290px;
          }
        }
      `}</style>
    </div>
  );
};
