'use client';

import { ReactNode } from 'react';
import { CopilotKit } from '@copilotkit/react-core';

export function CopilotWrapper({ children }: { children: ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="neuroplay_agent">
      {children}
    </CopilotKit>
  );
}
