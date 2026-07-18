import React from 'react';
import styles from './styles.module.css';

// A colored "stage" pill for release status (GA / Public Preview / Beta / …).
// Usable unimported in any .mdx via src/theme/MDXComponents.tsx.
// <StatusBadge stage="Public Preview" /> or <StatusBadge stage="GA" label="Lakebase" />

const MAP: Record<string, {cls: string; text: string}> = {
  'ga': {cls: 'ga', text: 'GA'},
  'generally available': {cls: 'ga', text: 'GA'},
  'available': {cls: 'ga', text: 'Available'},
  'public preview': {cls: 'public', text: 'Public Preview'},
  'preview': {cls: 'public', text: 'Preview'},
  'private preview': {cls: 'private', text: 'Private Preview'},
  'beta': {cls: 'beta', text: 'Beta'},
  'alpha': {cls: 'alpha', text: 'Alpha'},
  'coming soon': {cls: 'soon', text: 'Coming soon'},
  'not stated': {cls: 'muted', text: 'Stage not stated'},
  'mixed': {cls: 'mixed', text: 'Mixed'},
  'partnership': {cls: 'muted', text: 'Partnership'},
};

export default function StatusBadge({
  stage,
  label,
}: {
  stage?: string;
  label?: string;
}): React.ReactElement {
  const key = String(stage || '').trim().toLowerCase();
  const m = MAP[key] || {cls: 'muted', text: stage || '—'};
  return (
    <span className={`${styles.badge} ${styles['s_' + m.cls]}`}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.dot} aria-hidden="true" />
      {m.text}
    </span>
  );
}
