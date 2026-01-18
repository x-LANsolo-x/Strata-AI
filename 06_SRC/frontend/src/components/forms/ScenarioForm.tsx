import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateScenario } from '@/hooks/useScenarios';
import { Button } from '@/components/ui/Button';
import { useUiStore } from '@/stores/ui.store';
import { useEffect } from 'react';

const scenarioSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.enum(['hire', 'cut_expense', 'pricing', 'investment', 'custom']),
  modifications: z.object({
    expenseChange: z.number(),
    revenueChange: z.number(),
    oneTimeCashChange: z.number(),
    description: z.string().optional(),
  }),
});

type ScenarioFormData = z.infer<typeof scenarioSchema>;

export function ScenarioForm() {
  const { closeModal } = useUiStore();
  const createScenarioMutation = useCreateScenario();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScenarioFormData>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: {
      type: 'custom',
      name: '',
      modifications: {
        expenseChange: 0,
        revenueChange: 0,
        oneTimeCashChange: 0,
        description: '',
      },
    },
  });

  const onSubmit = (data: ScenarioFormData) => {
    createScenarioMutation.mutate(data);
  };

  useEffect(() => {
    if (createScenarioMutation.isSuccess) {
      // Reset form and close modal on successful submission
      reset();
      closeModal();
    }
  }, [createScenarioMutation.isSuccess, reset, closeModal]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Scenario Name</label>
        <input {...register('name')} id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select {...register('type')} id="type" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
          <option value="custom">Custom</option>
          <option value="hire">Hire</option>
          <option value="cut_expense">Cut Expense</option>
          <option value="pricing">Pricing</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <div>
        <label htmlFor="expenseChange" className="block text-sm font-medium text-gray-700">Monthly Expense Change ($)</label>
        <input {...register('modifications.expenseChange', { valueAsNumber: true })} id="expenseChange" type="number" placeholder="e.g., 5000 or -2000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" />
      </div>

      <div>
        <label htmlFor="revenueChange" className="block text-sm font-medium text-gray-700">Monthly Revenue Change ($)</label>
        <input {...register('modifications.revenueChange', { valueAsNumber: true })} id="revenueChange" type="number" placeholder="e.g., 10000 or -1000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={closeModal} disabled={createScenarioMutation.isPending}>Cancel</Button>
        <Button type="submit" disabled={createScenarioMutation.isPending}>
          {createScenarioMutation.isPending ? 'Saving...' : 'Create Scenario'}
        </Button>
      </div>
    </form>
  );
}
