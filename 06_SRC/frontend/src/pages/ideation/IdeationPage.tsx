import { useState } from 'react';
import { useGenerateIdeas } from '@/hooks/useIdeation';
import { IdeaCard } from '@/components/shared/IdeaCard';
import { Button } from '@/components/ui/Button';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function IdeationPage() {
  const [context, setContext] = useState('');
  const { mutate: generate, data: ideas, isPending, isError, isSuccess } = useGenerateIdeas();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.trim()) return;
    generate({ context });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BrainCircuit className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">AI Ideation Engine</h1>
        <p className="mt-2 text-lg text-gray-600">Discover your next strategic move. Describe your current situation to generate pivot ideas.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="e.g., 'We are a B2C subscription app for dog walkers with 100 paying users, but growth has stalled...'"
        />
        <div className="mt-4 flex justify-center">
          <Button type="submit" disabled={isPending || !context.trim()}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Ideas
              </>
            )}
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-gray-600">
            AI is thinking... this can take a moment.
          </motion.div>
        )}
      </AnimatePresence>

      {isError && <div className="text-red-500 text-center">An error occurred while generating ideas.</div>}

      {isSuccess && ideas && (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
        >
          {ideas.map(idea => (
            <motion.div key={idea.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <IdeaCard idea={idea} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
