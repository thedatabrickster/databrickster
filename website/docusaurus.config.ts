import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkAcronyms from './src/remark/acronyms.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Databrickster',
  tagline: 'Learn Databricks AI & AI Agents — from fundamentals to production, built for Data Engineers',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Deployed on Render as a static site (served at the domain root).
  // TODO(branding): update `url` to your real Render URL or custom domain.
  url: 'https://databrickster.onrender.com',
  baseUrl: '/',

  // Repo config (used for "edit this page" links and `npm run deploy`).
  organizationName: 'thedatabrickster',
  projectName: 'databrickster',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Enable Mermaid diagrams in Markdown (```mermaid fenced code blocks).
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // "Edit this page" links intentionally disabled (no GitHub links on site).
          remarkPlugins: [remarkAcronyms],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [remarkAcronyms],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Each learning "topic" is its own docs instance with its own content folder
  // and sidebar. The default instance (from the classic preset, path `docs/`,
  // route `/docs`) is the "Databricks AI" topic. New topics are added here.
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'genie',
        path: 'genie',
        routeBasePath: 'genie',
        sidebarPath: './sidebarsGenie.ts',
        remarkPlugins: [remarkAcronyms],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'business-intelligence',
        path: 'business-intelligence',
        routeBasePath: 'business-intelligence',
        sidebarPath: './sidebarsBusinessIntelligence.ts',
        remarkPlugins: [remarkAcronyms],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'agentic-coding',
        path: 'agentic-coding',
        routeBasePath: 'agentic-coding',
        sidebarPath: './sidebarsAgenticCoding.ts',
        remarkPlugins: [remarkAcronyms],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'databricks-features',
        path: 'databricks-features',
        routeBasePath: 'databricks-features',
        sidebarPath: './sidebarsDatabricksFeatures.ts',
        remarkPlugins: [remarkAcronyms],
      },
    ],
  ],

  themeConfig: {
    // TODO(branding): replace with a real social card image.
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Mermaid renders in the site theme (light/dark) automatically.
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    navbar: {
      title: 'Databrickster',
      logo: {
        alt: 'Databrickster Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'curriculumSidebar',
          position: 'left',
          label: 'Databricks AI',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'genie',
          sidebarId: 'genieSidebar',
          position: 'left',
          label: 'Genie',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'business-intelligence',
          sidebarId: 'biSidebar',
          position: 'left',
          label: 'Business Intelligence',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'agentic-coding',
          sidebarId: 'agenticCodingSidebar',
          position: 'left',
          label: 'Agentic Coding',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'databricks-features',
          sidebarId: 'databricksFeaturesSidebar',
          position: 'left',
          label: 'Databricks Features',
        },
        {to: '/blog', label: 'Deep Dives', position: 'left'},
        {to: '/about', label: 'About', position: 'right'},
        {
          href: 'https://docs.databricks.com/aws/en/agents/',
          label: 'Databricks Docs ↗',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Topics',
          items: [
            {
              label: 'Databricks AI',
              to: '/docs/intro',
            },
            {
              label: 'Genie',
              to: '/genie',
            },
            {
              label: 'Business Intelligence',
              to: '/business-intelligence',
            },
            {
              label: 'Agentic Coding',
              to: '/agentic-coding',
            },
            {
              label: 'Databricks Features',
              to: '/databricks-features',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'Databricks Agents Docs',
              href: 'https://docs.databricks.com/aws/en/agents/',
            },
            {
              label: 'MLflow for GenAI',
              href: 'https://docs.databricks.com/aws/en/mlflow3/genai/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Deep Dives (Blog)',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Databrickster. A free, independent educational project. Not affiliated with Databricks, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'sql', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
