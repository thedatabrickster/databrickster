import MDXComponents from '@theme-original/MDXComponents';
import Acronym from '@site/src/components/Acronym';
import StatusBadge from '@site/src/components/StatusBadge';

// Route every <abbr> — whether hand-written in a lesson or injected by the
// remark-acronyms plugin — through our Acronym component (hover + click reveal).
// StatusBadge is available unimported in any .mdx page.
export default {
  ...MDXComponents,
  abbr: Acronym,
  StatusBadge,
};
