import React from 'react';
import Heading from '@theme/Heading';
import styles from './BenefitsSection.module.css';

const BENEFITS = [
  {
    icon: '🧠',
    title: 'Pensamiento computacional',
    description: 'Desarrolla lógica, secuencias y resolución de problemas desde temprana edad.',
  },
  {
    icon: '🔧',
    title: 'Aprendizaje práctico',
    description: 'Construye, programa y experimenta con equipos reales en cada clase.',
  },
  {
    icon: '🎨',
    title: 'Creatividad STEAM',
    description: 'Combina ciencia, tecnología, arte y matemáticas en proyectos únicos.',
  },
  {
    icon: '👥',
    title: 'Trabajo colaborativo',
    description: 'Fomenta roles, comunicación y trabajo en equipo con actividades grupales.',
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.benefits}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>¿Por qué elegirnos?</span>
          <Heading as="h2">Aprendizaje que transforma</Heading>
          <p>Metodología probada con equipos de clase mundial.</p>
        </div>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b, i) => (
            <div key={i} className={styles.benefitCard}>
              <span className={styles.benefitIcon}>{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
