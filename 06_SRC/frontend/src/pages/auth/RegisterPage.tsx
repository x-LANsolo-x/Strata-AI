import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth.store';
import { register as registerService } from '@/services/auth.service';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const { user, token } = await registerService(data.fullName, data.email, data.password);
      loginUser(user, token);
      navigate('/onboarding'); // Always go to onboarding after register
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">Create an Account</h2>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input {...register('fullName')} id="fullName" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} id="password" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Create Account
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-black hover:underline">Log In</Link>
      </p>
    </form>
  );
}
