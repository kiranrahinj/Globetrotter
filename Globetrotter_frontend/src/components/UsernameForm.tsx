import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Globe } from 'lucide-react';

interface UsernameFormProps {
  onComplete: () => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerNewUser, error } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsSubmitting(true);
    try {
      await registerNewUser(username.trim());
      onComplete();
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <div className="flex justify-center mb-6">
        <Globe className="h-16 w-16 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Globetrotter!</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter a username to start your journey around the world.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !username.trim()}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isSubmitting || !username.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Registering...' : 'Start Playing'}
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;