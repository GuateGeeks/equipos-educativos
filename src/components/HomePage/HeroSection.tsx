import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './HeroSection.module.css';

const HERO_WORDS = ['Robótica', 'Electrónica', 'Programación', 'Creatividad'];

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HERO_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={clsx(styles.animatedWord, visible && styles.visible)}>
      {HERO_WORDS[index]}
    </span>
  );
}

export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradient} />
        <div className={styles.heroPattern} />
      </div>
      <div className={clsx('container', styles.heroContent)}>
        <span className={styles.heroBadge}>🚀 Educación STEM para el futuro</span>
        <Heading as="h1" className={styles.heroTitle}>
          Aprende <AnimatedWord /> <br />
          de forma divertida
        </Heading>
        <p className={styles.heroSubtitle}>
          Plataformas y equipos educativos para que niños y jóvenes 
          exploren tecnología, construyan proyectos y desarrollen 
          habilidades del siglo XXI.
        </p>
        <div className={styles.heroCta}>
          <Link className={clsx('button button--lg', styles.ctaPrimary)} to="/intro">
            Explorar equipos
          </Link>
          <Link className={clsx('button button--lg button--outline', styles.ctaSecondary)} to="#devices">
            Ver catálogo ↓
          </Link>
        </div>
      </div>
      <div className={styles.heroScroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </header>
  );
}
