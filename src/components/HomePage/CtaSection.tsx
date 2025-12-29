import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <Heading as="h2">¿Listo para empezar?</Heading>
            <p>
              Descubre tutoriales, desafíos y recursos descargables 
              para cada equipo. Todo lo que necesitas para tus clases.
            </p>
            <div className={styles.ctaButtons}>
              <Link className="button button--primary button--lg" to="/equipos/intro">
                Comenzar ahora
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                Leer el blog
              </Link>
            </div>
          </div>
          <div className={styles.ctaVisual}>
            <div className={styles.ctaEmoji}>🎓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
