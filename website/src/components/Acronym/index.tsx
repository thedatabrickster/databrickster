import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

// Renders an acronym that reveals its full term on hover (native tooltip via the
// `title` attribute) AND on click/tap (a persistent popover that stays open until
// you click away or press Escape). Mapped to the `abbr` element in
// src/theme/MDXComponents.tsx, so both hand-written <abbr title="..."> tags and
// the ones injected by the remark-acronyms plugin render this way.
export default function Acronym({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // No definition available — render the text plainly.
  if (!title) return <>{children}</>;

  return (
    <span className={styles.acronym} ref={ref}>
      <button
        type="button"
        className={styles.term}
        title={title}
        aria-label={`${
          typeof children === 'string' ? children : 'acronym'
        }: ${title}`}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}>
        {children}
      </button>
      {open && (
        <span role="tooltip" className={styles.pop}>
          {title}
        </span>
      )}
    </span>
  );
}
