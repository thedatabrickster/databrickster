import React from 'react';
import ReadAloud from '@site/src/components/ReadAloud';

// Root wraps the whole app. We mount the floating read-aloud player here so it
// appears on every content page (it hides itself where there's no article text).
export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  return (
    <>
      {children}
      <ReadAloud />
    </>
  );
}
