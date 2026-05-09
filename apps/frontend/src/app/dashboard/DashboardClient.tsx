'use client';

import { useCoAgent } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import DynamicRenderer from '@/components/DynamicRenderer';
import { A2UISchema } from '@/lib/a2ui-schema';
import { motion } from 'framer-motion';

export default function DashboardClient() {
  const { state } = useCoAgent<{ current_schema?: A2UISchema }>({
    name: 'neuroplay_agent',
    initialState: {},
  });

  const schema = state?.current_schema;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="flex-1 w-full overflow-y-auto">
        {schema ? (
          <DynamicRenderer schema={schema} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-24 h-24 rounded-full border-t-2 border-r-2 border-purple-500 mb-8"
            />
            <h2 className="text-2xl font-bold mb-2">Waiting for Neural Sync...</h2>
            <p className="text-zinc-400">Open the chat popup and ask me to teach you something!</p>
          </div>
        )}
      </div>

      <CopilotPopup
        instructions="You are NeuroPlay AI, an advanced gamified learning agent. You teach data structures and algorithms."
        defaultOpen={true}
        labels={{
          title: "NeuroPlay AI",
          initial: "What would you like to learn today?"
        }}
      />
    </div>
  );
}
