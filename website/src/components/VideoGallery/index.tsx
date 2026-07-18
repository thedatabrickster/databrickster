import React, {useState} from 'react';
import styles from './styles.module.css';

type Video = {id: string; title: string};

// Interactive YouTube gallery: a big player up top, a clickable thumbnail grid
// below. Clicking a card swaps the player (stays in-page). Usable unimported in
// any .mdx via MDXComponents.
export default function VideoGallery({
  playlist,
  videos = [],
}: {
  playlist?: string;
  videos?: Video[];
}): React.ReactElement {
  const [active, setActive] = useState<string | undefined>(videos[0]?.id);
  const listParam = playlist ? `?list=${playlist}` : '';
  const src = active
    ? `https://www.youtube-nocookie.com/embed/${active}${listParam}`
    : '';

  return (
    <div className={styles.wrap}>
      {active && (
        <div className={styles.player}>
          <iframe
            src={src}
            title="AI/BI Genie video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.grid}>
        {videos.map((v, i) => (
          <button
            type="button"
            key={v.id}
            className={`${styles.card} ${v.id === active ? styles.active : ''}`}
            onClick={() => setActive(v.id)}>
            <span className={styles.thumbWrap}>
              <img
                className={styles.thumb}
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
              />
              <span className={styles.play} aria-hidden="true">
                ▶
              </span>
            </span>
            <span className={styles.title}>{v.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
