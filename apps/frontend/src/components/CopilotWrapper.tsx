'use client';

import { ReactNode } from 'react';
import { CopilotKitProvider } from '@copilotkit/react-core/v2';

export function CopilotWrapper({ children }: { children: ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit">
      {children}
    </CopilotKitProvider>
  );
}
