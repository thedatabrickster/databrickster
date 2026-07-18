import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.kchip}>Free · independent · in-depth</span>
        <Heading as="h1" className={styles.heroTitle}>
          Data Engineers → AI Engineers, on Databricks.
        </Heading>
        <p className={styles.heroSubtitle}>
          Courses and references that take you from LLM foundations to governed,
          production AI agents — and a catalog of the whole platform.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.btnPrimary} to="/docs/intro">
            Start with Databricks AI →
          </Link>
          <Link className={styles.btnGhost} to="/databricks-features">
            Browse Databricks Features
          </Link>
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
