import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ImageViewer.module.css';

type ImageViewerProps = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ImageViewer({ src, alt, caption }: ImageViewerProps) {
  const [open, setOpen] = useState(false);
  const resolvedSrc = useBaseUrl(src);

  return (
    <>
      <div className={styles.wrapper} onClick={() => setOpen(true)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(true)}>
        <img src={resolvedSrc} alt={alt} />
        <div className={styles.overlay}>
          <span className={styles.overlayLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            Ver imagen
          </span>
        </div>
      </div>

      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Cerrar">×</button>
            <img src={resolvedSrc} alt={alt} />
            {caption && <p className={styles.caption}>{caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}
