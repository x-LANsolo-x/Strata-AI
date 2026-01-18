import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useUpdateStartupProfile } from '@/hooks/useStartup';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Combine all onboarding steps into a single schema
const onboardingSchema = z.object({
  name: z.string().min(2, "Startup name is required"),
  industry: z.string().min(2, "Industry is required"),
  stage: z.enum(['idea', 'mvp', 'growth', 'scale']),
  initialCash: z.number().min(0, "Initial cash must be positive"),
  monthlyBurn: z.number().min(0, "Monthly burn must be positive"),
});
type OnboardingFormData = z.infer<typeof onboardingSchema>;

const steps = [
  { id: 1, name: 'Startup Basics' },
  { id: 2, name: 'Financial Snapshot' },
  { id: 3, name: 'Finish' },
];

export function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: updateStartup, isPending } = useUpdateStartupProfile();

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      industry: '',
      stage: 'idea',
      initialCash: 0,
      monthlyBurn: 0,
    },
  });

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['name', 'industry', 'stage']);
    } else if (currentStep === 2) {
      isValid = await trigger(['initialCash', 'monthlyBurn']);
    }

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = (data: OnboardingFormData) => {
    console.log("Onboarding data submitted:", data);
    updateStartup(
      { name: data.name, industry: data.industry, stage: data.stage },
      { onSuccess: () => navigate('/') }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome to Strata-AI</h1>
        <p className="text-gray-600 mb-6">Let's set up your startup profile.</p>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step.id ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.id}
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step.id ? 'text-black' : 'text-gray-400'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Step 1: Startup Basics</h3>
              <div>
                <label htmlFor="name">Startup Name</label>
                <input {...register('name')} id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="industry">Industry</label>
                <input {...register('industry')} id="industry" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
              </div>
              <div>
                <label htmlFor="stage">Stage</label>
                <select {...register('stage')} id="stage" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="idea">Idea</option>
                  <option value="mvp">MVP</option>
                  <option value="growth">Growth</option>
                  <option value="scale">Scale</option>
                </select>
                {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage.message}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
             <div className="space-y-4">
              <h3 className="font-semibold">Step 2: Financial Snapshot</h3>
               <div>
                 <label htmlFor="initialCash">Initial Cash Balance ($)</label>
                 <input {...register('initialCash', { valueAsNumber: true })} id="initialCash" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                 {errors.initialCash && <p className="text-red-500 text-sm mt-1">{errors.initialCash.message}</p>}
               </div>
               <div>
                 <label htmlFor="monthlyBurn">Average Monthly Burn ($)</label>
                 <input {...register('monthlyBurn', { valueAsNumber: true })} id="monthlyBurn" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                 {errors.monthlyBurn && <p className="text-red-500 text-sm mt-1">{errors.monthlyBurn.message}</p>}
               </div>
             </div>
          )}

          {currentStep === 3 && (
            <div className="text-center">
              <h3 className="font-semibold text-lg">All set!</h3>
              <p className="text-gray-600 mt-2">Click finish to jump into your dashboard.</p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="secondary" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2"/>}
                Finish
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
