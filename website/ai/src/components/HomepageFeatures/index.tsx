import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
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
    cta: 'Start learning →',
    description: (
      <>
        From what a token really is to building, evaluating, deploying, and
        governing production AI agents on Databricks. 13 parts, built for Data
        Engineers — plus a full AI system design interview prep track.
      </>
    ),
  },
  {
    title: 'Genie & Business Intelligence',
    status: 'Coming soon',
    to: '/genie',
    cta: 'Preview the plan →',
    description: (
      <>
        Conversational analytics: ask governed data questions in plain English
        with Genie and AI/BI, and build the trustworthy BI layer around it.
      </>
    ),
  },
  {
    title: 'VS Code for AI Engineers',
    status: 'Coming soon',
    to: '/vscode',
    cta: 'Preview the plan →',
    description: (
      <>
        Build AI faster in a real editor — VS Code and Claude Code — with a
        repo-first, testable, CI-ready workflow for Databricks and beyond.
      </>
    ),
  },
];

function TopicCard({title, status, to, cta, description}: Topic) {
  const available = status === 'Available';
  return (
    <div className={clsx('col col--4')} style={{marginBottom: '1.5rem'}}>
      <Link
        to={to}
        style={{textDecoration: 'none', color: 'inherit', display: 'block', height: '100%'}}>
        <div className="card" style={{height: '100%', padding: '1.5rem'}}>
          <div
            className="card__header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}>
            <Heading as="h3" style={{marginBottom: 0}}>
              {title}
            </Heading>
            <span
              className={clsx(
                'badge',
                available ? 'badge--success' : 'badge--secondary',
              )}>
              {status}
            </span>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <span className="button button--primary button--block">{cta}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center" style={{marginBottom: '2rem'}}>
          Explore the topics
        </Heading>
        <div className="row">
          {TopicList.map((props, idx) => (
            <TopicCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
