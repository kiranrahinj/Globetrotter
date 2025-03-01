import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { registerUser, updateUserScore} from '../api';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  registerNewUser: (username: string) => Promise<User>;
  updateScore: (isCorrect: boolean) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('globetrotter_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  },[]);

  const registerNewUser = async (username: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      // Use mock function for development, replace with real API call later
      // const newUser = await mockRegisterUser(username);
      const newUser = await registerUser(username);
      console.log(newUser);
      
      setUser(newUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      setError('Failed to register user. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateScore = async (isCorrect: boolean): Promise<void> => {
    if (!user) return;
    
    try {
      // Use mock function for development, replace with real API call later
      // const updatedUser = await mockUpdateUserScore(user.id, isCorrect);
      const updatedUser = await updateUserScore(user.username, isCorrect);
      setUser(updatedUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, registerNewUser, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};