// remark-acronyms: on each page, wrap the FIRST plain-text occurrence of a known
// acronym in an <abbr title="Full Term">ACRO</abbr> element, so readers can hover
// or click to see what it stands for (see src/components/Acronym).
//
// Design choices that keep it safe:
//  - Case-sensitive, whole-token match (so "RAG" matches, "rag"/"dragged" do not).
//  - First occurrence per document only (later uses stay clean).
//  - Never touches code, inline code, links, headings, or existing <abbr> — and it
//    records acronyms already inside a hand-written <abbr> as "seen" so we never
//    double-annotate.
//  - Curated to AI / Databricks / data-engineering jargon that genuinely needs a
//    gloss — not ubiquitous terms like API/SQL/JSON.

const ACRONYMS = {
  LLM: 'Large Language Model — a model that generates text by predicting the next tokens',
  LLMs: 'Large Language Models',
  RAG: 'Retrieval-Augmented Generation — retrieve relevant text, then let the model answer grounded in it',
  MCP: 'Model Context Protocol — an open standard for how agents discover and call tools',
  PII: 'Personally Identifiable Information',
  PHI: 'Protected Health Information',
  MNPI: 'Material Non-Public Information — price-sensitive information not yet public',
  KYC: 'Know Your Customer — the regulated identity-verification process for new clients',
  ANN: 'Approximate Nearest Neighbor — fast, slightly inexact vector similarity search',
  UDF: 'User-Defined Function — a custom function you register to run over rows',
  ETL: 'Extract, Transform, Load — the classic data-pipeline pattern',
  ELT: 'Extract, Load, Transform — load raw data first, transform in-warehouse',
  DAB: 'Databricks Asset Bundle — infrastructure-as-code for Databricks resources',
  DABs: 'Databricks Asset Bundles',
  GTE: 'General Text Embeddings — the model family behind databricks-gte-large-en',
  BGE: 'BAAI General Embedding — from the Beijing Academy of Artificial Intelligence',
  RLHF: 'Reinforcement Learning from Human Feedback',
  TTFT: 'Time To First Token — latency until the first output token appears',
  QPS: 'Queries Per Second',
  DBFS: 'Databricks File System',
  SSO: 'Single Sign-On',
  MFA: 'Multi-Factor Authentication',
  DLP: 'Data Loss Prevention',
  SDK: 'Software Development Kit',
  IDE: 'Integrated Development Environment',
  CI: 'Continuous Integration',
  CD: 'Continuous Delivery / Deployment',
};

// Longest keys first so multi-letter acronyms win over any prefix.
const KEYS = Object.keys(ACRONYMS).sort((a, b) => b.length - a.length);
const ALT = KEYS.join('|');
// Bounded by non-alphanumerics on both sides (lookarounds), case-sensitive.
const SCAN = new RegExp(`(?<![A-Za-z0-9])(${ALT})(?![A-Za-z0-9])`, 'g');
const EXACT = new RegExp(`^(${ALT})$`);

const BLOCK_TYPES = new Set([
  'link',
  'linkReference',
  'heading',
  'code',
  'inlineCode',
  'definition',
  'yaml',
  'toml',
  'mdxjsEsm',
  'mdxFlowExpression',
  'mdxTextExpression',
]);

function isAbbr(node) {
  return (
    (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') &&
    node.name === 'abbr'
  );
}

function isAnchor(node) {
  return (
    (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') &&
    (node.name === 'a' || node.name === 'code' || node.name === 'pre')
  );
}

function collectText(node) {
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(collectText).join('');
}

function makeAbbr(matchText, key) {
  return {
    type: 'mdxJsxTextElement',
    name: 'abbr',
    attributes: [
      {type: 'mdxJsxAttribute', name: 'title', value: ACRONYMS[key]},
    ],
    children: [{type: 'text', value: matchText}],
  };
}

function wrapText(value, seen) {
  SCAN.lastIndex = 0;
  let match;
  let last = 0;
  const out = [];
  let changed = false;
  while ((match = SCAN.exec(value)) !== null) {
    const key = match[1];
    if (seen.has(key)) continue; // already annotated earlier on the page
    seen.add(key);
    if (match.index > last) {
      out.push({type: 'text', value: value.slice(last, match.index)});
    }
    out.push(makeAbbr(match[0], key));
    last = match.index + match[0].length;
    changed = true;
  }
  if (!changed) return null;
  if (last < value.length) out.push({type: 'text', value: value.slice(last)});
  return out;
}

export default function remarkAcronyms() {
  return (tree) => {
    const seen = new Set();

    const walk = (node, blocked) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        // A hand-written <abbr>: mark its acronym seen, then skip its subtree.
        if (isAbbr(child)) {
          const txt = collectText(child).trim();
          const m = txt.match(EXACT);
          if (m) seen.add(m[1]);
          continue;
        }

        if (child.type === 'text') {
          if (blocked) continue;
          const repl = wrapText(child.value, seen);
          if (repl) {
            node.children.splice(i, 1, ...repl);
            i += repl.length - 1;
          }
          continue;
        }

        // Admonition/directive titles (the [label] part) carry data.directiveLabel.
        const isDirectiveLabel =
          child.type === 'paragraph' && child.data && child.data.directiveLabel;

        const childBlocked =
          blocked ||
          BLOCK_TYPES.has(child.type) ||
          isAnchor(child) ||
          isDirectiveLabel;
        walk(child, childBlocked);
      }
    };

    walk(tree, false);
  };
}
