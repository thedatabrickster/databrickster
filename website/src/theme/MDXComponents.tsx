import MDXComponents from '@theme-original/MDXComponents';
import Acronym from '@site/src/components/Acronym';

// Route every <abbr> — whether hand-written in a lesson or injected by the
// remark-acronyms plugin — through our Acronym component (hover + click reveal).
export default {
  ...MDXComponents,
  abbr: Acronym,
};
