import React, {type ReactNode} from 'react';
import type {Props} from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import styles from './styles.module.css';

export default function ExpandButton({toggleSidebar}: Props): ReactNode {
  return (
    <div
      className={styles.expandButton}
      title="Abrir panel"
      aria-label="Abrir panel"
      tabIndex={0}
      role="button"
      onKeyDown={toggleSidebar}
      onClick={toggleSidebar}
    >
      <div className={styles.track}>
        <svg
          className={styles.arrow}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4.5 2.5L9.5 7L4.5 11.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.label}>Panel</span>
      </div>
      <div className={styles.glow} aria-hidden="true" />
    </div>
  );
}
