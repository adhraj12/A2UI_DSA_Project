'use client';

import { useCoAgent, useCopilotChat, useCopilotContext } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import DynamicRenderer from '@/components/DynamicRenderer';
import { A2UISchema } from '@/lib/a2ui-schema';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const hasTriggered = useRef(false);
  const context = useCopilotContext();
  const { appendMessage } = useCopilotChat();
  
  useEffect(() => {
    console.log('DashboardClient: Copilot Context available:', !!context);
  }, [context]);

  const { state } = useCoAgent<{ current_schema?: A2UISchema }>({
    name: 'default',
    initialState: {},
  });

  const schema = state?.current_schema;

  // Handle URL topic parameter
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic && !hasTriggered.current) {
      hasTriggered.current = true;
      appendMessage({
        id: Math.random().toString(36).substring(7),
        role: 'user',
        content: `I want to learn about: ${topic}`,
      });
    }
  }, [searchParams, appendMessage]);

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${schema?.theme === 'premium_light' || !schema ? 'bg-slate-50 text-slate-900' : 'bg-black text-white'}`}>
      <div className="flex-1 w-full overflow-y-auto">
        {schema ? (
          <DynamicRenderer schema={schema} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-24 h-24 rounded-full border-t-2 border-r-2 border-indigo-500 mb-8"
            />
            <h2 className="text-2xl font-bold mb-2">Neural Sync in Progress...</h2>
            <p className="text-slate-500">NeuroPlay AI is building your personalized interactive workspace.</p>
          </div>
        )}
      </div>

      <CopilotPopup
        agent="default"
        instructions="You are NeuroPlay AI, an advanced gamified learning agent. You teach any topic by generating Generative UI (A2UI) schemas."
        defaultOpen={true}
        labels={{
          title: "NeuroPlay AI",
          initial: "What would you like to explore today?"
        }}
      />
    </div>
  );
}
