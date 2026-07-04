import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1
}) => {
  const { ref, visible } = useScrollReveal(threshold);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rv ${className} ${visible ? 'rv--on' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
