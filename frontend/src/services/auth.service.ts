import { apiClient } from './api.client';

interface User {
  id: string;
  fullName: string;
  email: string;
  onboardingCompleted: boolean;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export const login = async (email: string, password?: string): Promise<{ user: User; token: string }> => {
  console.log('Attempting login for:', email);
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Backend expects form data with 'username' field (email is the username)
  const response = await apiClient.postForm<LoginResponse>('/auth/login', {
    username: email,
    password: password,
  });

  // Store token temporarily to make authenticated request
  const tempToken = response.access_token;
  
  // Fetch user info from /startup/me endpoint
  let user: User;
  try {
    const meResponse = await fetch('http://127.0.0.1:8000/api/v1/startup/me', {
      headers: {
        'Authorization': `Bearer ${tempToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (meResponse.ok) {
      const userData = await meResponse.json();
      user = {
        id: userData.id,
        fullName: userData.full_name || email.split('@')[0],
        email: userData.email,
        onboardingCompleted: userData.onboarding_completed || false,
      };
    } else {
      // Fallback if /me endpoint fails
      user = {
        id: 'current_user',
        fullName: email.split('@')[0],
        email: email,
        onboardingCompleted: false,
      };
    }
  } catch {
    // Fallback on network error
    user = {
      id: 'current_user',
      fullName: email.split('@')[0],
      email: email,
      onboardingCompleted: false,
    };
  }

  console.log('Login successful, onboarding:', user.onboardingCompleted);
  return { user, token: response.access_token };
};

export const register = async (fullName: string, email: string, password?: string): Promise<{ user: User; token: string }> => {
  console.log('Attempting to register:', fullName, email);
  
  if (!email || !fullName || !password) {
    throw new Error('All fields are required');
  }

  // Register the user
  const registerResponse = await apiClient.post<RegisterResponse>('/auth/register', {
    email,
    password,
    full_name: fullName,
  });

  // Auto-login after registration
  const loginResponse = await apiClient.postForm<LoginResponse>('/auth/login', {
    username: email,
    password: password,
  });

  const user: User = {
    id: registerResponse.id,
    fullName: registerResponse.full_name,
    email: registerResponse.email,
    onboardingCompleted: false, // New users haven't completed onboarding
  };

  console.log('Registration successful');
  return { user, token: loginResponse.access_token };
};
