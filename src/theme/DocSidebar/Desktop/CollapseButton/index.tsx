import React, {type ReactNode} from 'react';
import type {Props} from '@theme/DocSidebar/Desktop/CollapseButton';
import styles from './styles.module.css';

export default function CollapseButton({onClick}: Props): ReactNode {
  return (
    <button
      type="button"
      title="Ocultar panel"
      aria-label="Ocultar panel"
      className={styles.collapseButton}
      onClick={onClick}
    >
      <span className={styles.inner}>
        <svg
          className={styles.arrow}
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.5 2.5L4.5 7L9.5 11.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.label}>Ocultar panel</span>
      </span>
    </button>
  );
}
