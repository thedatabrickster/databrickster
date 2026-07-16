import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for Data Engineers',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every AI concept is taught using what you already know — Spark, SQL,
        Delta Lake, ETL, and pipelines. No hand-waving, no unexplained jargon.
        We define it, explain why it exists, and map it to a familiar idea.
      </>
    ),
  },
  {
    title: 'Fundamentals → Production',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Start from what a token and an embedding actually are, then build up to
        RAG, agents, evaluation, and enterprise deployment on Databricks —
        governance, observability, cost, and CI/CD included.
      </>
    ),
  },
  {
    title: 'Runnable, Real, and Deep',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Production-quality code on the latest Databricks APIs, extensive
        diagrams, and realistic enterprise scenarios across banking, insurance,
        healthcare, and more. Depth over brevity, always.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
