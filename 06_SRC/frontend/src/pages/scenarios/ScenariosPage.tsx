import { useScenarios } from '@/hooks/useScenarios';
import { ScenarioCard } from '@/components/shared/ScenarioCard';
import { Button } from '@/components/ui/Button';
import { Loader2, Plus } from 'lucide-react';
import { useUiStore } from '@/stores/ui.store'; // 1. Import the store hook

export function ScenariosPage() {
  const { data: scenarios, isLoading, isError } = useScenarios();
  const { openModal } = useUiStore(); // 2. Get the openModal function

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      );
    }

    if (isError) {
      return <div className="text-red-500">Error fetching scenarios.</div>;
    }

    if (scenarios?.length === 0) {
      return <p>No scenarios created yet. Get started by creating one!</p>;
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenarios?.map(scenario => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">What-If Scenarios</h1>
        {/* 3. Add onClick handler */}
        <Button onClick={() => openModal('createScenario')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Scenario
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}
