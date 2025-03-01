import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import UsernameForm from '../components/UsernameForm';
import GameBoard from '../components/GameBoard';
import { Globe } from 'lucide-react';


const Home: React.FC = () => {

  const { user, loading } = useUser();
  const [searchParams] = useSearchParams();
  const [invitingUser, setInvitingUser] = useState<{ username: string; score: number } | null>(null);
  const [showGame, setShowGame] = useState(false);
  

  const handleLogout=()=>{
    localStorage.removeItem("globetrotter_user");
    window.location.reload();
  }


  useEffect(() => {
    // const inviteId = searchParams.get('invite');
    // if (inviteId) {
    //   // Fetch the inviting user's info
    //   const fetchInvitingUser = async () => {
    //     try {
    //       const userData = await mockGetUserById(1);
    //       setInvitingUser({
    //         username: userData.username,
    //         score: userData.score.correct
    //       });
    //     } catch (error) {
    //       console.error('Error fetching inviting user:', error);
    //     }
    //   };
      
    //   fetchInvitingUser();
    // }
  }, [searchParams]);

  const handleUsernameComplete = () => {
    setShowGame(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Globetrotter</h1>
          </div>
          {user && (
            <div className="text-sm text-gray-600">
              Playing as <span className="font-semibold">{user.username}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={()=>handleLogout()}>Logout</button>
            </div>
          )}
          
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {invitingUser && !user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <span className="font-bold">{invitingUser.username}</span> has challenged you to beat their score of <span className="font-bold">{invitingUser.score}</span> correct answers!
            </p>
          </div>
        )}

        {!user && !showGame ? (
          <UsernameForm onComplete={handleUsernameComplete} />
        ) : (
          <GameBoard />
        )}
      </main>

      <footer className="footer bg-white border-t border-gray-200 text-xl text-black font-bold py-6 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Globetrotter. Test your knowledge of world destinations!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;