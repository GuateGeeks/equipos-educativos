import type { ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  HeroSection,
  StatsSection,
  BenefitsSection,
  DevicesSection,
  CtaSection,
} from '../components/HomePage';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Equipos Educativos STEM"
      description="Plataformas de robótica, electrónica y programación para educación. Tutoriales, desafíos y recursos para el aula."
    >
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <DevicesSection />
      <CtaSection />
    </Layout>
  );
}
