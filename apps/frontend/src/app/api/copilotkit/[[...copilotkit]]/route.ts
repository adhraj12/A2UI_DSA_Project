import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { LangGraphHttpAgent } from '@copilotkit/runtime/langgraph';
import { NextRequest } from 'next/server';

const neuroplay_agent = new LangGraphHttpAgent({
  url: 'http://127.0.0.1:8133/copilotkit',
});

const runtime = new CopilotRuntime({
  agents: {
    neuroplay_agent,
  },
});

const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  endpoint: '/api/copilotkit',
});

export const GET = handleRequest;
export const POST = handleRequest;
export const OPTIONS = handleRequest;
