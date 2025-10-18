import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample static data (replace with Mongo data later)
const initialGames = [
  { id: 1, title: 'Elden Ring', review: 'Amazing gameplay, challenging bosses.' },
  { id: 2, title: 'Hades', review: 'Fast-paced and addicting rogue-like.' },
  { id: 3, title: 'Celeste', review: 'Emotional platformer with tight controls.' },
  { id: 4, title: 'Stardew Valley', review: 'Relaxing farming sim with depth.' },
  { id: 5, title: 'Hollow Knight', review: 'Atmospheric and beautifully designed.' },
];

const Games = () => {
  const [games, setGames] = useState(initialGames);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Temp hardcoded, will use auth later

  const handleDelete = (id) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  const handleCardClick = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const handleAddNewGame = () => {
    console.log("Add new game clicked");
    // Add your add game logic here, e.g. open modal or redirect
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <Link
              to="/"
              className="flex items-center text-primary-100 hover:text-primary-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-center text-primary-100">Game Library</h1>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => handleCardClick(game)}
              className="bg-[#1f1f1f] p-4 rounded-lg shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-transform relative group"
            >
              <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
              <p className="text-sm text-slate-400 line-clamp-2">{game.review}</p>

              {/* Admin Buttons (edit/delete) */}
              {isAdmin && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit', game.id);
                    }}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(game.id);
                    }}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add New Game Card */}
          {isAdmin && (
            <div
              onClick={handleAddNewGame}
              className="flex items-center justify-center bg-[#1f1f1f] rounded-lg shadow cursor-pointer hover:shadow-lg hover:scale-105 transition-transform text-green-500 text-5xl font-bold select-none"
              style={{ aspectRatio: '1 / 1' }}
            >
              +
            </div>
          )}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] rounded-lg p-8 max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-slate-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedGame.title}</h2>
            <p className="text-slate-300">{selectedGame.review}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
