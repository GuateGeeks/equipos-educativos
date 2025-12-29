import React from 'react';
import styles from './StatsSection.module.css';

const STATS = [
  { value: '5+', label: 'Equipos disponibles', icon: '🤖' },
  { value: '50+', label: 'Actividades y retos', icon: '🎯' },
  { value: '3-14', label: 'Años de edad', icon: '👦' },
  { value: '∞', label: 'Posibilidades', icon: '✨' },
];

export default function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
