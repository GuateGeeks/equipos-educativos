import React from 'react';
import styles from './YoutubeVideo.module.css';

export type VideoItem = {
  id: string;
  title: string;
  description?: string;
  tag?: string;
};

function extractYoutubeId(url: string): string {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : url;
}

export function YoutubeVideo({ id, title, description, tag }: VideoItem) {
  const videoId = id.length === 11 ? id : extractYoutubeId(id);
  return (
    <div className={styles.card}>
      <div className={styles.embedWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={styles.info}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}

export function YoutubeGrid({ videos, wide }: { videos: VideoItem[]; wide?: boolean }) {
  return (
    <div className={`${styles.grid}${wide ? ' ' + styles.wide : ''}`}>
      {videos.map((v) => (
        <YoutubeVideo key={v.id} {...v} />
      ))}
    </div>
  );
}
