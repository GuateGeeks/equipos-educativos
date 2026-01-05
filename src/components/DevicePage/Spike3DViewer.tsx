import React, {useEffect, useRef} from 'react';
import styles from './Spike3DViewer.module.css';

// A‑Frame 3D viewer with improved lighting, materials, and interaction.
// Embedded scene with orbit controls for an interactive, polished experience.
export default function Spike3DViewer() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ensureScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
        if (existing) {
          if ((existing as any)._loaded) return resolve();
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
          return;
        }
        const script = document.createElement('script');
        (script as any)._loaded = false;
        script.src = src;
        script.async = true;
        script.addEventListener('load', () => {
          (script as any)._loaded = true;
          resolve();
        });
        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
        document.head.appendChild(script);
      });

    const load = async () => {
      try {
        await ensureScript('https://aframe.io/releases/1.7.1/aframe.min.js');
        await ensureScript('https://unpkg.com/aframe-orbit-controls@1.3.2/dist/aframe-orbit-controls.min.js');
      } catch (e) {
        console.warn('A-Frame or orbit-controls failed to load:', e);
      }
    };

    load();
  }, []);

  return (
    <div className={styles.viewerContainer} ref={sceneRef}>
      {/* A‑Frame scene with enhanced lighting and visuals */}
      {/* eslint-disable-next-line jsx-a11y/aria-role */}
      <a-scene embedded className={styles.aframeScene} background="color: #ffffff">
        <a-assets>
          <a-asset-item id="spikeObj" src="/equipos-educativos/models/spike/new/model.obj"></a-asset-item>
          <a-asset-item id="spikeMtl" src="/equipos-educativos/models/spike/new/model.mtl"></a-asset-item>
        </a-assets>

        {/* Multi-layer lighting for depth and polish */}
        <a-entity light="type: ambient; intensity: 0.5; color: #ffffff"></a-entity>
        <a-entity light="type: directional; intensity: 1.2; color: #ffffff" position="3 4 2"></a-entity>
        <a-entity light="type: directional; intensity: 0.6; color: #e8f0ff" position="-3 2 -2"></a-entity>
        <a-entity light="type: point; intensity: 0.8; color: #ffd9a8" position="0 2.5 0" distance="8"></a-entity>

        {/* Main model with continuous rotation and subtle bobbing */}
        <a-entity
          id="spikeModel"
          obj-model="obj: #spikeObj; mtl: #spikeMtl"
          position="0 1.2 0"
          scale="0.025 0.025 0.025"
          animation__spin="property: rotation; to: 0 360 0; dur: 12000; loop: true; easing: linear"
          animation__bob="property: position; to: 0 1.35 0; from: 0 1.2 0; dur: 3000; loop: true; easing: easeInOutSine; dir: alternate"
        ></a-entity>

        {/* Subtle ground plane for context */}
        <a-plane
          width="5"
          height="5"
          rotation="-90 0 0"
          position="0 -2 0"
          color="#f0f4f8"
          shadow="cast: false; receive: true"
        ></a-plane>

        {/* Camera with smooth orbit controls and mouse interaction */}
        <a-entity
          id="camera"
          camera="active: true; fov: 60"
          position="0 1.3 10"
          orbit-controls="target: #spikeModel; enableZoom: true; autoRotate: true; autoRotateSpeed: 2; rotateSpeed: 0.5; zoomSpeed: 0.5; minDistance: 1.2; maxDistance: 5; minPolarAngle: 0; maxPolarAngle: 10"
        ></a-entity>
      </a-scene>

      {/* Info overlay */}
      <div className={styles.infoOverlay}>
        <p className={styles.infoText}>Spike Prime Hub</p>
      </div>
    </div>
  );
}
