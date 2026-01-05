import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import DeviceCard from '../DeviceCard';
import devices from '../../../devices/devices.json';
import styles from './DevicesSection.module.css';

export default function DevicesSection() {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredDevices = filter 
    ? devices.filter(d => d.category === filter)
    : devices;

  return (
    <section id="devices" className={styles.devicesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Catálogo</span>
          <Heading as="h2">Equipos educativos</Heading>
          <p>Explora nuestras plataformas de robótica, electrónica y programación.</p>
        </div>
        
        <div className={styles.filterBar}>
          <button 
            className={clsx(styles.filterBtn, !filter && styles.active)}
            onClick={() => setFilter(null)}
          >
            Todos
          </button>
          {Array.from(new Set(devices.map(d => d.category))).map(category => (
            <button
              key={category}
              className={clsx(styles.filterBtn, filter === category && styles.active)}
              onClick={() => setFilter(filter === category ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.devicesGrid}>
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </div>
        
        <div className={styles.devicesFooter}>
          <Link className="button button--outline button--lg" to="/intro">
            Ver todos los recursos →
          </Link>
        </div>
      </div>
    </section>
  );
}
