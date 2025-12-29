import React from 'react';
import styles from './ChallengeCard.module.css';

type ChallengeCardProps = {
  level: 'básico' | 'intermedio' | 'avanzado';
  title: string;
  description: string;
  duration?: string;
};

const levelColors: Record<string, string> = {
  básico: '#22c55e',
  intermedio: '#f59e0b',
  avanzado: '#ef4444',
};

export default function ChallengeCard({ level, title, description, duration }: ChallengeCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.badge} style={{ background: levelColors[level] }}>{level}</span>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.desc}>{description}</p>
      {duration && <span className={styles.duration}>⏱ {duration}</span>}
    </div>
  );
}
