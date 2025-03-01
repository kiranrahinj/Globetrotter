export interface Destination {
  id: string;
  name: string;
  clue: string;
  funFacts: string[];
  trivia: string[];
  image: string;
  correctAnswer:string;
}

export interface Options {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  score: number;
}

export interface GameState {
  currentDestination: Destination | null;
  options: Options[];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  currentClueIndex: number;
  revealedFact: string | null;
}