import React, {useState} from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type DeviceCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export default function DeviceCard({ id, name, description, image }: DeviceCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Link
      to={`/equipos/${id}`}
      className={styles.card}
      aria-label={`Ver detalles de ${name}`}
    >
      <div className={styles.media}>
        {!error && (
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        {!loaded && !error && <div className={styles.skeleton} />}
        {error && (
          <div className={styles.fallback} aria-hidden="true">
            <span className={styles.fallbackText}>{name?.[0] ?? '?'}</span>
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.overlayCta}>Ver más →</span>
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}
