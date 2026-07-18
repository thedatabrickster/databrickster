import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const STATS = [
  {value: '13-part', label: 'Databricks AI course'},
  {value: '70+', label: 'feature architecture guides'},
  {value: '2 tracks', label: 'VS Code + Claude Code'},
  {value: 'DAIS 2026', label: 'announcements, decoded'},
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <span className={styles.eyebrow}>Free · independent · in-depth</span>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          Courses and references that turn <strong>Data Engineers</strong> into{' '}
          <strong>AI Engineers</strong> — on Databricks and beyond.
        </p>
        <div className={styles.buttons}>
          <Link className={clsx('button button--lg', styles.btnPrimary)} to="/docs/intro">
            Start with Databricks AI →
          </Link>
          <Link
            className={clsx('button button--lg', styles.btnGhost)}
            to="/databricks-features">
            Browse Databricks Features
          </Link>
        </div>
        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Learn Databricks AI, Agents & more`}
      description="Free, in-depth courses and references for Data Engineers becoming AI Engineers: Databricks AI & Agents, Agentic Coding (VS Code + Claude Code), a 70+ Databricks feature catalog, and DAIS 2026 coverage.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
