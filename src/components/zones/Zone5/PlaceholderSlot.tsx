import React from 'react';
import { Camera, Play, Landmark, Link2 } from 'lucide-react';
import styles from './styles/industry.module.css';

interface PlaceholderSlotProps {
  type: 'image' | 'video' | 'logo' | 'link';
  description: string;
  className?: string;
  width?: string;
  height?: string;
}

export function PlaceholderSlot({
  type,
  description,
  className = '',
  width = 'w-full',
  height = 'h-40'
}: PlaceholderSlotProps) {
  // Select matching emoji / icon
  const getIcon = () => {
    switch (type) {
      case 'image':
        return <Camera className={`${styles.textGold} placeholderIcon w-8 h-8`} />;
      case 'video':
        return <Play className={`${styles.textGold} placeholderIcon w-8 h-8 fill-current`} />;
      case 'logo':
        return <Landmark className={`${styles.textGold} placeholderIcon w-8 h-8`} />;
      case 'link':
        return <Link2 className={`${styles.textGold} placeholderIcon w-8 h-8`} />;
    }
  };

  return (
    <div
      className={`${styles.placeholderSlot} ${width} ${height} ${className}`}
      data-placeholder={type}
    >
      <div className="flex flex-col items-center justify-center text-center p-4">
        {getIcon()}
        <span className={`${styles.textSteel} ${styles.fontSans} text-xs uppercase tracking-wide mt-2 font-medium max-w-xs block`}>
          [REPLACE: {description}]
        </span>
      </div>
    </div>
  );
}
