import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './calculadora.module.css';

type ScoringOption =
  | { type: 'boolean'; label: string; points: number; id: string }
  | { type: 'radio'; label: string; options: { label: string; points: number }[]; id: string };

interface Mission {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  thumbnail?: string;
  scoring: ScoringOption[];
  accent: string;
}

const MISSIONS: Mission[] = [
  {
    id: 'm00',
    code: 'M00',
    title: 'Área de Inspección',
    subtitle: 'Preparación de ronda',
    description:
      'Antes de comenzar, todo el equipo del robot — base, accesorios y modelos — debe caber dentro de una sola área de lanzamiento. Es el punto más accesible del tablero, y una recompensa por la disciplina del diseño.',
    accent: '#4a4a52',
    scoring: [
      { type: 'boolean', id: 'm00_fit', label: 'Todo cabe en una sola área de lanzamiento', points: 20 },
    ],
  },
  {
    id: 'm01',
    code: 'M01',
    title: 'Proyecto de Innovación',
    subtitle: 'Idea del equipo en el tablero',
    description:
      'El modelo que el equipo diseñó para su proyecto de innovación vuelve al tablero. Basta con que toque al menos parcialmente el área objetivo de la planta de hidrógeno para registrar el aporte.',
    image: '/equipos-educativos/img/legoleague/superpowered/m01-innovation-project.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m01-innovation-project-thumb.webp',
    accent: '#1565c0',
    scoring: [
      {
        type: 'boolean',
        id: 'm01_model',
        label: 'Modelo al menos parcialmente en el área objetivo de la planta de hidrógeno',
        points: 10,
      },
    ],
  },
  {
    id: 'm02',
    code: 'M02',
    title: 'Plataforma Petrolera',
    subtitle: 'Transporte de combustible',
    description:
      'Carga unidades de combustible en el camión y ubícalo sobre la estación de abastecimiento. Más combustible a bordo = mayor puntaje, con un bono adicional al estacionar correctamente.',
    image: '/equipos-educativos/img/legoleague/superpowered/m02-oil-platform.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m02-oil-platform-thumb.webp',
    accent: '#6a1b9a',
    scoring: [
      {
        type: 'radio',
        id: 'm02_fuel',
        label: 'Unidades de combustible en el camión',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de combustible', points: 5 },
          { label: '2 unidades de combustible', points: 10 },
          { label: '3 unidades de combustible', points: 15 },
        ],
      },
      {
        type: 'boolean',
        id: 'm02_truck',
        label: 'Camión sobre la estación de abastecimiento con ≥1 unidad de combustible dentro',
        points: 10,
      },
    ],
  },
  {
    id: 'm03',
    code: 'M03',
    title: 'Almacenamiento de Energía',
    subtitle: 'Entrega al depósito',
    description:
      'Deposita unidades de energía en el depósito de almacenamiento. El robot debe separarlas completamente de la bandeja de origen para que cuenten.',
    image: '/equipos-educativos/img/legoleague/superpowered/m03-energy-storage.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m03-energy-storage-thumb.webp',
    accent: '#00838f',
    scoring: [
      {
        type: 'radio',
        id: 'm03_delivery',
        label: 'Unidades de energía completamente en el depósito',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 10 },
          { label: '2 unidades de energía', points: 20 },
          { label: '3 unidades de energía', points: 30 },
        ],
      },
      {
        type: 'boolean',
        id: 'm03_tray',
        label: 'La unidad almacenada ya no toca la bandeja',
        points: 5,
      },
    ],
  },
  {
    id: 'm04',
    code: 'M04',
    title: 'Granja Solar',
    subtitle: 'Cosecha de energía',
    description:
      'Retira unidades de energía del círculo de inicio de la granja solar. Cuanta más energía liberes, más puntos — con un salto notable al llegar a tres.',
    image: '/equipos-educativos/img/legoleague/superpowered/m04-solar-farm.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m04-solar-farm-thumb.webp',
    accent: '#e65100',
    scoring: [
      {
        type: 'radio',
        id: 'm04_removed',
        label: 'Unidades retiradas del círculo de inicio',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 5 },
          { label: '2 unidades de energía', points: 10 },
          { label: '3 unidades de energía', points: 20 },
        ],
      },
    ],
  },
  {
    id: 'm05',
    code: 'M05',
    title: 'Red Inteligente',
    subtitle: 'Cooperación entre equipos',
    description:
      'Levanta por completo el conector naranja de tu campo. Si el equipo del lado opuesto también lo logra, ambos ganan un bono compartido — la esencia de Coopertition®.',
    image: '/equipos-educativos/img/legoleague/superpowered/m05-smart-grid.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m05-smart-grid-thumb.webp',
    accent: '#1b5e20',
    scoring: [
      {
        type: 'radio',
        id: 'm05_connector',
        label: 'Conectores naranjas levantados',
        options: [
          { label: 'Ninguno', points: 0 },
          { label: 'El conector de tu campo está levantado', points: 20 },
          { label: 'Ambos conectores (tú y el otro equipo) levantados', points: 30 },
        ],
      },
    ],
  },
  {
    id: 'm06',
    code: 'M06',
    title: 'Auto Híbrido',
    subtitle: 'Movilidad eléctrica',
    description:
      'Baja el auto híbrido de su rampa y coloca la unidad híbrida en su interior. Las dos metas son independientes — puedes cumplir una, la otra, o ambas.',
    image: '/equipos-educativos/img/legoleague/superpowered/m06-hybrid-car.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m06-hybrid-car-thumb.webp',
    accent: '#ad1457',
    scoring: [
      { type: 'boolean', id: 'm06_ramp', label: 'Auto híbrido ya no toca la rampa', points: 10 },
      { type: 'boolean', id: 'm06_unit', label: 'Unidad híbrida dentro del auto híbrido', points: 10 },
    ],
  },
  {
    id: 'm07',
    code: 'M07',
    title: 'Turbina Eólica',
    subtitle: 'Generación por viento',
    description:
      'Separa unidades de energía de la turbina eólica. Cada unidad liberada simula energía generada y enviada a la red.',
    image: '/equipos-educativos/img/legoleague/superpowered/m07-wind-turbine.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m07-wind-turbine-thumb.webp',
    accent: '#0d47a1',
    scoring: [
      {
        type: 'radio',
        id: 'm07_units',
        label: 'Unidades que ya no tocan la turbina',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 10 },
          { label: '2 unidades de energía', points: 20 },
          { label: '3 unidades de energía', points: 30 },
        ],
      },
    ],
  },
  {
    id: 'm08',
    code: 'M08',
    title: 'Ver Televisión',
    subtitle: 'Consumo doméstico',
    description:
      'Levanta el televisor y coloca una unidad de energía en la ranura verde para encenderlo. Son dos logros independientes que suman por separado.',
    image: '/equipos-educativos/img/legoleague/superpowered/m08-watch-television.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m08-watch-television-thumb.webp',
    accent: '#5d4037',
    scoring: [
      { type: 'boolean', id: 'm08_tv', label: 'Televisor completamente levantado', points: 10 },
      { type: 'boolean', id: 'm08_unit', label: 'Unidad de energía en la ranura verde', points: 10 },
    ],
  },
  {
    id: 'm09',
    code: 'M09',
    title: 'Juguete Dinosaurio',
    subtitle: 'Almacenamiento portátil',
    description:
      'Cierra la tapa del juguete con una unidad de energía o una batería recargable adentro, y llévalo al área de inicio izquierda. La batería recargable vale el doble que la unidad simple.',
    image: '/equipos-educativos/img/legoleague/superpowered/m09-dinosaur-toy.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m09-dinosaur-toy-thumb.webp',
    accent: '#558b2f',
    scoring: [
      {
        type: 'radio',
        id: 'm09_contents',
        label: 'Contenido dentro del juguete',
        options: [
          { label: 'Ninguno', points: 0 },
          { label: 'Tapa cerrada con unidad de energía', points: 10 },
          { label: 'Tapa cerrada con batería recargable', points: 20 },
        ],
      },
      {
        type: 'boolean',
        id: 'm09_location',
        label: 'Juguete completamente en área de inicio izquierda',
        points: 10,
      },
    ],
  },
  {
    id: 'm10',
    code: 'M10',
    title: 'Planta de Energía',
    subtitle: 'Redistribución de carga',
    description:
      'Desconecta unidades de la planta eléctrica para simular despacho hacia la red. El salto de 2 a 3 unidades liberadas es desproporcionado — premia la misión completa.',
    image: '/equipos-educativos/img/legoleague/superpowered/m10-power-plant.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m10-power-plant-thumb.webp',
    accent: '#f57f17',
    scoring: [
      {
        type: 'radio',
        id: 'm10_units',
        label: 'Unidades que ya no tocan la planta',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 5 },
          { label: '2 unidades de energía', points: 10 },
          { label: '3 unidades de energía', points: 25 },
        ],
      },
    ],
  },
  {
    id: 'm11',
    code: 'M11',
    title: 'Presa Hidroeléctrica',
    subtitle: 'Energía del agua',
    description:
      'Libera por completo la unidad de energía de la presa hidroeléctrica. Una sola unidad, pero vale 20 puntos por la dificultad del mecanismo.',
    image: '/equipos-educativos/img/legoleague/superpowered/m11-hydroelectric-dam.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m11-hydroelectric-dam-thumb.webp',
    accent: '#01579b',
    scoring: [
      {
        type: 'boolean',
        id: 'm11_unit',
        label: 'La unidad de energía ya no toca la presa',
        points: 20,
      },
    ],
  },
  {
    id: 'm12',
    code: 'M12',
    title: 'Depósito de Agua',
    subtitle: 'Distribución hídrica',
    description:
      'Cuelga unidades de agua en los ganchos elevados y deposita otras en el tapete del reservorio. Dos sub-misiones que pueden completarse de forma independiente.',
    image: '/equipos-educativos/img/legoleague/superpowered/m12-water-reservoir.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m12-water-reservoir-thumb.webp',
    accent: '#006064',
    scoring: [
      {
        type: 'radio',
        id: 'm12_hooks',
        label: 'Ganchos con unidades de agua',
        options: [
          { label: 'Ninguno', points: 0 },
          { label: '1 gancho con agua', points: 10 },
          { label: '2 ganchos con agua', points: 20 },
        ],
      },
      {
        type: 'radio',
        id: 'm12_mat',
        label: 'Unidades de agua en el depósito (tocando tapete)',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de agua', points: 5 },
          { label: '2 unidades de agua', points: 10 },
          { label: '3 unidades de agua', points: 15 },
        ],
      },
    ],
  },
  {
    id: 'm13',
    code: 'M13',
    title: 'Power-To-X',
    subtitle: 'Conversión a hidrógeno',
    description:
      'Deposita unidades de energía completamente dentro del área objetivo de la planta de hidrógeno. El aporte es proporcional y estable: 5 puntos por cada unidad.',
    image: '/equipos-educativos/img/legoleague/superpowered/m13-power-to-x.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m13-power-to-x-thumb.webp',
    accent: '#283593',
    scoring: [
      {
        type: 'radio',
        id: 'm13_units',
        label: 'Unidades en el área de hidrógeno',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 5 },
          { label: '2 unidades de energía', points: 10 },
          { label: '3 unidades de energía', points: 15 },
        ],
      },
    ],
  },
  {
    id: 'm14',
    code: 'M14',
    title: 'Fábrica de Juguetes',
    subtitle: 'Producción y liberación',
    description:
      'Libera el mini dinosaurio de la línea de producción y coloca unidades de energía en la tolva roja o la ranura trasera. Dos acciones, dos fuentes de puntaje.',
    image: '/equipos-educativos/img/legoleague/superpowered/m14-toy-factory.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m14-toy-factory-thumb.webp',
    accent: '#880e4f',
    scoring: [
      { type: 'boolean', id: 'm14_dino', label: 'Mini dinosaurio ha sido liberado', points: 10 },
      {
        type: 'radio',
        id: 'm14_units',
        label: 'Unidades en tolva roja o ranura trasera',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 5 },
          { label: '2 unidades de energía', points: 10 },
          { label: '3 unidades de energía', points: 15 },
        ],
      },
    ],
  },
  {
    id: 'm15',
    code: 'M15',
    title: 'Batería Recargable',
    subtitle: 'Almacenamiento de reserva',
    description:
      'Transporta unidades de energía al área objetivo de la batería recargable. 5 puntos por unidad hasta un total máximo de tres.',
    image: '/equipos-educativos/img/legoleague/superpowered/m15-rechargeable-battery.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m15-rechargeable-battery-thumb.webp',
    accent: '#2e7d32',
    scoring: [
      {
        type: 'radio',
        id: 'm15_units',
        label: 'Unidades en el área de la batería',
        options: [
          { label: 'Ninguna', points: 0 },
          { label: '1 unidad de energía', points: 5 },
          { label: '2 unidades de energía', points: 10 },
          { label: '3 unidades de energía', points: 15 },
        ],
      },
    ],
  },
  {
    id: 'm16',
    code: 'M16',
    title: 'Fichas de Precisión',
    subtitle: 'Bonus final por desempeño',
    description:
      'Cada equipo inicia la ronda con 6 fichas de precisión. Cada vez que el árbitro intervenga por tocar el robot en mala posición, pierdes una. Conservar las fichas puede valer hasta 50 puntos al cierre.',
    image: '/equipos-educativos/img/legoleague/superpowered/m16-precision-tokens.webp',
    thumbnail: '/equipos-educativos/img/legoleague/superpowered/m16-precision-tokens-thumb.webp',
    accent: '#37474f',
    scoring: [
      {
        type: 'radio',
        id: 'm16_tokens',
        label: 'Fichas de precisión conservadas al final',
        options: [
          { label: '0 fichas', points: 0 },
          { label: '1 ficha', points: 10 },
          { label: '2 fichas', points: 15 },
          { label: '3 fichas', points: 25 },
          { label: '4 fichas', points: 35 },
          { label: '5 fichas', points: 50 },
          { label: '6 fichas', points: 50 },
        ],
      },
    ],
  },
];

type ScoreState = Record<string, number | boolean>;

const STORAGE_KEY = 'superpowered-calculadora-v1';

function getInitialState(): ScoreState {
  const state: ScoreState = {};
  for (const mission of MISSIONS) {
    for (const option of mission.scoring) {
      if (option.type === 'boolean') {
        state[option.id] = false;
      } else {
        state[option.id] = 0;
      }
    }
  }
  return state;
}

function getMissionScore(mission: Mission, state: ScoreState): number {
  let total = 0;
  for (const option of mission.scoring) {
    if (option.type === 'boolean') {
      if (state[option.id] === true) total += option.points;
    } else {
      const idx = state[option.id] as number;
      total += option.options[idx]?.points ?? 0;
    }
  }
  return total;
}

function getMissionMaxScore(mission: Mission): number {
  let total = 0;
  for (const option of mission.scoring) {
    if (option.type === 'boolean') {
      total += option.points;
    } else {
      total += Math.max(...option.options.map((o) => o.points));
    }
  }
  return total;
}

function useCountUp(target: number, durationMs = 420): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = value;
    const from = fromRef.current;
    const to = target;
    if (from === to) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

const SIDEBAR_KEY = 'docusaurus.sidebar.isHidden';

function dispatchSidebarStorage(value: string | null) {
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: SIDEBAR_KEY,
      newValue: value,
      storageArea: localStorage,
    }),
  );
}

export default function Calculadora() {
  const [scoreState, setScoreState] = useState<ScoreState>(getInitialState);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const previous = localStorage.getItem(SIDEBAR_KEY);
    localStorage.setItem(SIDEBAR_KEY, 'true');
    dispatchSidebarStorage('true');
    return () => {
      if (previous === null) {
        localStorage.removeItem(SIDEBAR_KEY);
      } else {
        localStorage.setItem(SIDEBAR_KEY, previous);
      }
      dispatchSidebarStorage(previous);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setScoreState({ ...getInitialState(), ...parsed });
        }
      }
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreState));
    } catch {
      /* ignore */
    }
  }, [scoreState, mounted]);

  const missionScores = useMemo(
    () => MISSIONS.map((m) => ({ id: m.id, score: getMissionScore(m, scoreState), max: getMissionMaxScore(m) })),
    [scoreState],
  );
  const totalScore = useMemo(() => missionScores.reduce((acc, m) => acc + m.score, 0), [missionScores]);
  const maxScore = useMemo(() => missionScores.reduce((acc, m) => acc + m.max, 0), [missionScores]);
  const completedCount = useMemo(() => missionScores.filter((m) => m.score > 0).length, [missionScores]);

  const animatedTotal = useCountUp(totalScore);

  const handleBoolean = (id: string, value: boolean) => {
    setScoreState((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadio = (id: string, idx: number) => {
    setScoreState((prev) => ({ ...prev, [id]: idx }));
  };

  const handleReset = () => {
    if (totalScore > 0 && !window.confirm('¿Reiniciar toda la puntuación?')) return;
    setScoreState(getInitialState());
  };

  const progress = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return (
    <div className={styles.page}>
      {/* Sticky thin topbar */}
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <span className={styles.brandDot} aria-hidden="true" />
            <span className={styles.brandText}>SUPERPOWERED℠</span>
            <span className={styles.brandYear}>2022 / 2023</span>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.miniScore}>
              <span className={styles.miniLabel}>Total</span>
              <span className={styles.miniValue}>{animatedTotal}</span>
              <span className={styles.miniDivider}>/</span>
              <span className={styles.miniMax}>{maxScore}</span>
            </div>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
              title="Reiniciar puntuación"
            >
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroHead}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDash} />
              Calculadora de puntuación · Temporada 2022/2023
            </span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>Héroes de la</span>
              <span className={styles.heroTitleLineItalic}>energía</span>
            </h1>
            <p className={styles.heroLead}>
              La temporada <strong>SUPERPOWERED℠</strong> de FIRST LEGO League invita a los equipos a recorrer la ruta
              completa de la energía — generación, almacenamiento, distribución y uso — a través de diecisiete
              misiones sobre el tablero de juego. Esta herramienta registra tu puntuación en tiempo real durante la
              ronda de robot y la conserva localmente para que puedas retomarla cuando quieras.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.bigScore}>
              <span className={styles.bigScoreLabel}>Puntuación actual</span>
              <div className={styles.bigScoreValue}>
                <span className={styles.bigScoreNumber}>{animatedTotal}</span>
                <span className={styles.bigScoreSuffix}>pts</span>
              </div>
              <div className={styles.bigScoreMeta}>
                <span>
                  Máximo posible <em>{maxScore}</em>
                </span>
                <span className={styles.bigScoreDot} aria-hidden="true" />
                <span>
                  Misiones con puntaje <em>{completedCount} / {MISSIONS.length}</em>
                </span>
              </div>
            </div>

            <nav className={styles.missionIndex} aria-label="Índice de misiones">
              <span className={styles.indexLabel}>Ir a misión</span>
              <div className={styles.indexGrid}>
                {MISSIONS.map((m, i) => {
                  const ms = missionScores[i];
                  const active = ms.score > 0;
                  return (
                    <a
                      key={m.id}
                      href={`#${m.id}`}
                      className={`${styles.indexCell} ${active ? styles.indexCellActive : ''}`}
                      style={{ '--accent': m.accent } as React.CSSProperties}
                    >
                      <span className={styles.indexCode}>{m.code}</span>
                      <span className={styles.indexScore}>{ms.score}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Missions */}
      <div className={styles.missionsWrap}>
        {MISSIONS.map((mission, i) => {
          const ms = missionScores[i];
          const active = ms.score > 0;
          const isFlipped = i % 2 === 1;
          return (
            <article
              key={mission.id}
              id={mission.id}
              className={`${styles.mission} ${isFlipped ? styles.missionFlip : ''} ${active ? styles.missionActive : ''}`}
              style={{ '--accent': mission.accent } as React.CSSProperties}
            >
              <div className={styles.missionRule}>
                <span className={styles.missionIndex2}>
                  {String(i + 1).padStart(2, '0')}
                  <span className={styles.missionIndexSlash}>/</span>
                  {String(MISSIONS.length).padStart(2, '0')}
                </span>
                <span className={styles.missionRuleLine} />
                <span className={styles.missionCodeBadge}>{mission.code}</span>
              </div>

              <div className={styles.missionGrid}>
                <div className={styles.missionLeft}>
                  <div className={styles.missionEyebrow}>{mission.subtitle}</div>
                  <h2 className={styles.missionTitle}>{mission.title}</h2>
                  <p className={styles.missionDesc}>{mission.description}</p>

                  {mission.image && (
                    <button
                      type="button"
                      className={styles.missionImageBtn}
                      onClick={() => setActiveImage(mission.image!)}
                      aria-label={`Ampliar imagen de ${mission.title}`}
                    >
                      <img
                        src={mission.thumbnail ?? mission.image}
                        alt={`Instrucciones de ${mission.title}`}
                        className={styles.missionImage}
                        loading="lazy"
                      />
                      <span className={styles.missionImageCaption}>
                        <span>Ampliar instrucciones</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </button>
                  )}
                </div>

                <div className={styles.missionRight}>
                  <div className={styles.scoringCard}>
                    <div className={styles.scoringHead}>
                      <span className={styles.scoringLabel}>Puntos disponibles</span>
                      <span className={styles.scoringCurrent}>
                        <span className={styles.scoringCurrentNum}>{ms.score}</span>
                        <span className={styles.scoringCurrentOf}> / {ms.max}</span>
                      </span>
                    </div>

                    <div className={styles.scoringBody}>
                      {mission.scoring.map((option) => {
                        if (option.type === 'boolean') {
                          const checked = scoreState[option.id] === true;
                          return (
                            <label
                              key={option.id}
                              className={`${styles.check} ${checked ? styles.checkActive : ''}`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => handleBoolean(option.id, e.target.checked)}
                                className={styles.srOnly}
                              />
                              <span className={styles.checkMark} aria-hidden="true">
                                <svg viewBox="0 0 16 16" width="12" height="12">
                                  <path
                                    d="M3 8l3.5 3.5L13 4.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                  />
                                </svg>
                              </span>
                              <span className={styles.checkText}>{option.label}</span>
                              <span className={styles.checkPts}>+{option.points}</span>
                            </label>
                          );
                        }
                        const selectedIdx = scoreState[option.id] as number;
                        return (
                          <div key={option.id} className={styles.radioGroup}>
                            <div className={styles.radioGroupLabel}>{option.label}</div>
                            <div className={styles.radioList}>
                              {option.options.map((opt) => {
                                const idx = option.options.indexOf(opt);
                                const selected = selectedIdx === idx;
                                return (
                                  <label
                                    key={`${option.id}-${idx}`}
                                    className={`${styles.radio} ${selected ? styles.radioActive : ''}`}
                                  >
                                    <input
                                      type="radio"
                                      name={option.id}
                                      checked={selected}
                                      onChange={() => handleRadio(option.id, idx)}
                                      className={styles.srOnly}
                                    />
                                    <span className={styles.radioDot} aria-hidden="true" />
                                    <span className={styles.radioText}>{opt.label}</span>
                                    <span className={styles.radioPts}>
                                      {opt.points > 0 ? `+${opt.points}` : '—'}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Summary */}
      <section className={styles.summary}>
        <div className={styles.summaryInner}>
          <div className={styles.summaryHead}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDash} />
              Resumen final
            </span>
            <h2 className={styles.summaryTitle}>Tu ronda, en números</h2>
            <p className={styles.summaryLead}>
              Desglose completo por misión. La puntuación se guarda automáticamente en tu navegador — cierra la
              pestaña y vuelve cuando quieras.
            </p>
          </div>

          <div className={styles.summaryTable} role="table">
            <div className={styles.summaryTableHeader} role="row">
              <span role="columnheader">#</span>
              <span role="columnheader">Misión</span>
              <span role="columnheader" className={styles.summaryCellRight}>
                Obtenido
              </span>
              <span role="columnheader" className={styles.summaryCellRight}>
                Máximo
              </span>
            </div>
            {MISSIONS.map((m, i) => {
              const ms = missionScores[i];
              return (
                <div
                  key={m.id}
                  role="row"
                  className={`${styles.summaryRow} ${ms.score > 0 ? styles.summaryRowActive : ''}`}
                  style={{ '--accent': m.accent } as React.CSSProperties}
                >
                  <span className={styles.summaryCode}>{m.code}</span>
                  <span className={styles.summaryMissionTitle}>
                    <span>{m.title}</span>
                    <span className={styles.summarySubtitle}>{m.subtitle}</span>
                  </span>
                  <span className={`${styles.summaryCellRight} ${styles.summaryScore}`}>
                    {ms.score}
                  </span>
                  <span className={`${styles.summaryCellRight} ${styles.summaryMax}`}>
                    {ms.max}
                  </span>
                </div>
              );
            })}
            <div role="row" className={styles.summaryTotalRow}>
              <span />
              <span className={styles.summaryTotalLabel}>Total de la ronda</span>
              <span className={`${styles.summaryCellRight} ${styles.summaryTotalScore}`}>
                {animatedTotal}
              </span>
              <span className={`${styles.summaryCellRight} ${styles.summaryMax}`}>{maxScore}</span>
            </div>
          </div>

          <div className={styles.summaryFootnote}>
            <span>
              FIRST LEGO League · SUPERPOWERED℠ presented by Qualcomm · 17 misiones de robot ·{' '}
              {maxScore} puntos máximos.
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActiveImage(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <img
            src={activeImage}
            alt="Instrucciones de misión"
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
