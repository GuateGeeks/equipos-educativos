import React from 'react';
import styles from './DownloadCard.module.css';

type DownloadCardProps = {
  title: string;
  description?: string;
  href: string;
  icon?: string;
};

export default function DownloadCard({ title, description, href, icon = '📥' }: DownloadCardProps) {
  return (
    <a href={href} download className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <div>
        <strong className={styles.title}>{title}</strong>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      <span className={styles.arrow}>↓</span>
    </a>
  );
}
