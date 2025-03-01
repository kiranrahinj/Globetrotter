import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Destination } from '../types';
import { useUser } from '../context/UserContext';
import { 
  getRandomDestination, 
  getDestinationOptions 
} from '../api';
import { MapPin, Frown, Award, RefreshCw, Share2 } from 'lucide-react';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';

const GameBoard: React.FC = () => {
  const { user, updateScore } = useUser();
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [options, setOptions] = useState<Destination[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [revealedFact, setRevealedFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate=useNavigate()
  const loadNewGame = async () => {
    setIsLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setRevealedFact(null);
    // setCurrentClueIndex(0);
    
    try {
      // In production, replace with real API calls
      const destination = await getRandomDestination();
      setCurrentDestination(destination);
      const allOptions = await getDestinationOptions(destination.id);

      
      // // Make sure the correct answer is among the options
      // const hasCorrectAnswer = allOptions.some(opt => opt.id === destination.id);
      // if (!hasCorrectAnswer) {
      //   // Replace a random option with the correct answer
      //   const randomIndex = Math.floor(Math.random() * allOptions.length);
      //   allOptions[randomIndex] = destination;
      // }
      
      // Shuffle options
      const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewGame();
  },[]);


  const handleAnswer = (destinationId: string) => {
    if (selectedAnswer !== null || !currentDestination) return;

    setSelectedAnswer(destinationId);
    const correct = destinationId === currentDestination.correctAnswer;
    setIsCorrect(correct);
    
    // Update score
    updateScore(correct);
    
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    // Show a random fact
    const facts = correct ? currentDestination.funFacts : currentDestination.trivia;
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setRevealedFact(randomFact);
    
    // Trigger confetti if correct
    
  };

  // const showNextClue = () => {
  //   if (!currentDestination || currentClueIndex >= currentDestination.clues.length - 1) return;
  //   setCurrentClueIndex(prev => prev + 1);
  // };

  const handleShareGame = () => {
    setShowShareModal(true);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}?invite=${user?.id}`;
  };

  const copyShareLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const shareToWhatsApp = () => {
    const link = generateShareLink();
    const text = `Hey! I'm playing Globetrotter and my score is ${user?.score.correct} correct answers. Can you beat me? Play here: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  const handle=()=>{
    navigate('/leaderBoard')
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Score display */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="font-bold text-lg mr-2">{user?.username}</span>
          <span className="text-sm text-gray-600">
            Score: {user?.score}
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <button 
            onClick={()=>handle()}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-green-700"
          >
            
            LeaderBoard
          </button>
        
          <button 
            onClick={handleShareGame}
            className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Share2 size={16} className="mr-1" />
            Challenge a Friend
          </button>
        </div>
      </div>

      {/* Game content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Clue section */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2" /> Destination Clue
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-h-[100px]">
            {currentDestination && (
              <p className="text-lg font-medium">
                {currentDestination.clue}
              </p>
            )}
          </div>
          
          {/* {currentDestination && currentClueIndex < currentDestination.clues.length - 1 && !selectedAnswer && (
            <button 
              onClick={showNextClue}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-white font-medium transition"
            >
              Show Another Clue
            </button>
          )} */}
        </div>
        
        {/* Options section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Where am I?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((option,index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option["1"])}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === option["1"]
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : selectedAnswer !== null && option["1"] === currentDestination?.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
              >
                {option["1"]}
              </motion.button>
            ))}
          </div>
          
          {/* Result and fact section */}
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
              } mb-6`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white mr-3`}>
                  {isCorrect ? <Award size={20} /> : <Frown size={20} />}
                </div>
                <div>
                  <h4 className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'} mb-1`}>
                    {isCorrect ? 'Correct!' : 'Not quite right!'}
                  </h4>
                  <p className="text-gray-700">{revealedFact}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Next game button */}
          {selectedAnswer && (
            <motion.button
              onClick={loadNewGame}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <RefreshCw size={18} className="mr-2" />
              Next Destination
            </motion.button>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Challenge a Friend</h3>
            <p className="mb-4 text-gray-600">
              Share your score and challenge friends to beat it!
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-medium">Your score: {user?.score.correct} correct answers</p>
              <p className="text-sm text-gray-500">Share this link with friends:</p>
              <div className="flex mt-2">
                <input 
                  type="text" 
                  value={generateShareLink()} 
                  readOnly
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                />
                <button 
                  onClick={copyShareLink}
                  className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3 mb-4">
              <button 
                onClick={shareToWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
              >
                Share to WhatsApp
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;