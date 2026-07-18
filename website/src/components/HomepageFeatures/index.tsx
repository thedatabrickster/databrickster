import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import StatusBadge from '@site/src/components/StatusBadge';
import styles from './styles.module.css';

type Topic = {
  title: string;
  status: 'Available' | 'Coming soon';
  to: string;
  cta: string;
  description: ReactNode;
};

const TopicList: Topic[] = [
  {
    title: 'Databricks AI',
    status: 'Available',
    to: '/docs/intro',
    cta: 'Start learning',
    description: (
      <>
        From what a token really is to building, evaluating, deploying, and
        governing production AI agents on Databricks — plus a full AI
        system-design interview-prep track.
      </>
    ),
  },
  {
    title: 'Agentic Coding',
    status: 'Available',
    to: '/agentic-coding',
    cta: 'Start learning',
    description: (
      <>
        Ship AI software faster with AI coding agents. A full <strong>VS Code</strong>{' '}
        track and a <strong>Claude Code</strong> track that builds a governed
        Databricks App end to end.
      </>
    ),
  },
  {
    title: 'Databricks Features',
    status: 'Available',
    to: '/databricks-features',
    cta: 'Browse the catalog',
    description: (
      <>
        Executive-style architecture guides for <strong>70+</strong> Databricks
        features — placement, use cases, alternatives, cost, and decision
        matrices.
      </>
    ),
  },
  {
    title: 'DAIS 2026',
    status: 'Available',
    to: '/dais-2026',
    cta: "See what's new",
    description: (
      <>
        A field guide to Data + AI Summit 2026 — every announcement with where it
        fits, an honest take, and its release stage (GA / Preview / Beta), sourced
        from the official blogs.
      </>
    ),
  },
  {
    title: 'Genie',
    status: 'Coming soon',
    to: '/genie',
    cta: 'Watch the series',
    description: (
      <>
        Ask governed data questions in plain English — Genie writes and runs the
        SQL, and shows its work. A full video series is available now.
      </>
    ),
  },
  {
    title: 'Business Intelligence',
    status: 'Coming soon',
    to: '/business-intelligence',
    cta: 'Preview the plan',
    description: (
      <>
        AI-era BI on the lakehouse: dashboards, a trustworthy metrics layer, and
        AI/BI in the flow of work — governed end to end.
      </>
    ),
  },
];

function TopicCard({title, status, to, cta, description}: Topic) {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardTop}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <StatusBadge stage={status} />
      </div>
      <p className={styles.cardBody}>{description}</p>
      <span className={styles.cardCta}>
        {cta} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Explore the tracks
        </Heading>
        <p className={styles.sectionSubtitle}>
          Four courses and references, live now — plus two on the way.
        </p>
        <div className={styles.grid}>
          {TopicList.map((props, idx) => (
            <TopicCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
