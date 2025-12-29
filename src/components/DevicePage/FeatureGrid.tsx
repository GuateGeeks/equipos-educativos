import React from 'react';
import styles from './FeatureGrid.module.css';

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type FeatureGridProps = {
  features: Feature[];
};

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className={styles.grid}>
      {features.map((f, i) => (
        <div key={i} className={styles.card}>
          <span className={styles.icon}>{f.icon}</span>
          <h4 className={styles.title}>{f.title}</h4>
          <p className={styles.desc}>{f.description}</p>
        </div>
      ))}
    </div>
  );
}
