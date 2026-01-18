import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth.store';
import { login } from '@/services/auth.service';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { user, token } = await login(data.email, data.password);
      loginUser(user, token);
      // Redirect based on onboarding status
      if (user.onboardingCompleted) {
        navigate('/');
      } else {
        navigate('/onboarding');
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">Welcome Back</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} id="password" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Log In
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-black hover:underline">Sign Up</Link>
      </p>
    </form>
  );
}
