export const login = async (email: string, password?: string) => {
  console.log('Attempting login for:', email, password ? '(with password)' : '(no password)');
  // In a real app, you'd send this to a backend.
  // Here, we'll just simulate a successful login.
  if (!email) Promise.reject('No user');

  const mockUser = {
    id: 'user_123',
    fullName: 'Priya Sharma',
    email: email,
    onboardingCompleted: false, // Add this flag
  };
  const mockToken = 'fake-jwt-token'; // A real app would get a real JWT

  return new Promise<{ user: typeof mockUser; token: string }>(resolve => {
    setTimeout(() => {
      console.log('Login successful');
      resolve({ user: mockUser, token: mockToken });
    }, 1000);
  });
};

export const register = async (fullName: string, email: string, password?: string) => {
  console.log('Attempting to register:', fullName, email, password ? '(with password)' : '(no password)');
  // This simulates creating a new user and then logging them in.
  if (!email || !fullName) return Promise.reject('Missing fields');

  const mockUser = {
    id: `user_${Date.now()}`,
    fullName,
    email,
    onboardingCompleted: false, // New users haven't completed onboarding
  };
  const mockToken = 'fake-jwt-token-for-new-user';

  return new Promise<{ user: typeof mockUser; token: string }>(resolve => {
    setTimeout(() => {
      console.log('Registration successful');
      resolve({ user: mockUser, token: mockToken });
    }, 1200); // Slightly longer delay for registration
  });
};
