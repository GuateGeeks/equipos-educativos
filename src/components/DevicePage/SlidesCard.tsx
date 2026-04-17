import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './SlidesCard.module.css';

type SlidesCardProps = {
  id: string;
  title: string;
  downloadHref: string;
};

export default function SlidesCard({ id, title, downloadHref }: SlidesCardProps) {
  const embedUrl = `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`;
  const openUrl = `https://docs.google.com/presentation/d/${id}/present`;
  const resolvedDownload = useBaseUrl(downloadHref);

  return (
    <div className={styles.card}>
      <div className={styles.embedWrapper}>
        <iframe
          src={embedUrl}
          title={title}
          allowFullScreen
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Abrir
          </a>
          <a href={resolvedDownload} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnSecondary}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            .pptx
          </a>
        </div>
      </div>
    </div>
  );
}
