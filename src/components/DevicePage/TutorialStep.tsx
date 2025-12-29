import React from 'react';
import styles from './TutorialStep.module.css';

type TutorialStepProps = {
  step: number;
  title: string;
  children: React.ReactNode;
};

export default function TutorialStep({ step, title, children }: TutorialStepProps) {
  return (
    <div className={styles.step}>
      <div className={styles.number}>{step}</div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
