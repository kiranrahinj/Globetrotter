import axios from 'axios';
import { Destination, User } from '../types';

// Replace with your actual API base URL
const API_BASE_URL = 'https://globetrotter1-v1bt.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRandomDestination = async (): Promise<Destination> => {
  try {
    const response = await api.get('/api/destination/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random destination:', error);
    throw error;
  }
};

export const getDestinationOptions = async (id: string): Promise<Destination[]> => {
  try {
    const response = await api.get(`/api/destination/options/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination options:', error);
    throw error;
  }
};

export const registerUser = async (username: string): Promise<User> => {
  try {
    const response = await api.post(`/api/user/register?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<User> => {
  try {
    const response = await api.get(`/api/user/getAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};


export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/api/user/getUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserScore = async (userId: string, isCorrect: boolean): Promise<User> => {
  try {
    const response = await api.put(`/api/user/score`, { userId, isCorrect });
    return response.data;
  } catch (error) {
    console.error('Error updating user score:', error);
    throw error;
  }
};

// Mock API functions for development (comment these out when connecting to real backend)
// export const mockGetRandomDestination = (): Promise<Destination> => {
//   return Promise.resolve({
//     id: '1',
//     name: 'Eiffel Tower',
//     clues: [
//       'I am an iron lady standing tall in the City of Light.',
//       'I was built for a World Fair in 1889.',
//       'I am named after my engineer, though many opposed my construction.'
//     ],
//     funFacts: [
//       'I was originally intended to be a temporary structure.',
//       'I grow taller in summer due to thermal expansion.',
//       'I am repainted every 7 years using 60 tons of paint.'
//     ],
//     trivia: [
//       'I was the tallest man-made structure in the world for 41 years.',
//       'I have 1,665 steps from ground level to the top.',
//       'I was almost dismantled in 1909, but was saved because I was useful for communication purposes.'
//     ],
//     image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e'
//   });
// };

// export const mockGetDestinationOptions = (count: number): Promise<Destination[]> => {
//   const options = [
//     {
//       id: '1',
//       name: 'Eiffel Tower',
//       clues: ['I am an iron lady standing tall in the City of Light.'],
//       funFacts: ['I was originally intended to be a temporary structure.'],
//       trivia: ['I have 1,665 steps from ground level to the top.'],
//       image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e'
//     },
//     {
//       id: '2',
//       name: 'Taj Mahal',
//       clues: ['I am a white marble mausoleum built by an emperor for his favorite wife.'],
//       funFacts: ['My white marble changes color throughout the day.'],
//       trivia: ['It took over 20,000 workers and 1,000 elephants to build me.'],
//       image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523'
//     },
//     {
//       id: '3',
//       name: 'Statue of Liberty',
//       clues: ['I was a gift from France to America.'],
//       funFacts: ['My full name is "Liberty Enlightening the World".'],
//       trivia: ['I wear a size 879 shoe.'],
//       image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a'
//     },
//     {
//       id: '4',
//       name: 'Great Wall of China',
//       clues: ['I am the longest wall in the world.'],
//       funFacts: ['I cannot actually be seen from the moon with the naked eye.'],
//       trivia: ['I stretch over 13,000 miles.'],
//       image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d'
//     }
//   ];
  
//   return Promise.resolve(options.slice(0, count));
// };

// export const mockRegisterUser = (username: string): Promise<User> => {
//   return Promise.resolve({
//     id: Math.random().toString(36).substring(2, 9),
//     username,
//     score: {
//       correct: 0,
//       incorrect: 0
//     }
//   });
// };

// export const mockGetUserById = (userId: string): Promise<User> => {
//   return Promise.resolve({
//     id: userId,
//     username: 'TestUser',
//     score: {
//       correct: 5,
//       incorrect: 2
//     }
//   });
// };

// export const mockUpdateUserScore = (userId: string, isCorrect: boolean): Promise<User> => {
//   const user = {
//     id: userId,
//     username: 'TestUser',
//     score: {
//       correct: 5,
//       incorrect: 2
//     }
//   };
  
//   if (isCorrect) {
//     user.score.correct += 1;
//   } else {
//     user.score.incorrect += 1;
//   }
  
//   return Promise.resolve(user);
// };
