import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime({
      remoteEndpoints: [
        {
          url: process.env.REMOTE_ACTION_URL || 'http://localhost:8133/copilotkit',
        },
      ],
    }),
    serviceAdapter: new OpenAIAdapter({}), // We use OpenAIAdapter as a dummy because the agent handles the LLM logic
    endpoint: '/api/copilotkit',
  });

  return handleRequest(req);
};
