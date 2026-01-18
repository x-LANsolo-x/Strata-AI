import { useUiStore } from '@/stores/ui.store';
import { Modal } from '@/components/ui/Modal';
import { ScenarioForm } from '@/components/forms/ScenarioForm';

export function ModalController() {
  const { type } = useUiStore();

  switch (type) {
    case 'createScenario':
      return (
        <Modal title="Create New Scenario">
          <ScenarioForm />
        </Modal>
      );
    default:
      return null; // No modal to render
  }
}
