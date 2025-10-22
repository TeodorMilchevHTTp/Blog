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
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-white px-6 py-12 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
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

          <h1 className="text-4xl font-extrabold text-primary-700 dark:text-primary-400 text-center">
            Game Library
          </h1>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => handleCardClick(game)}
              className="bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/20 p-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.03] transition-transform relative group"
            >
              <h2 className="text-2xl mt-5 font-semibold mb-3 text-primary-700 dark:text-primary-300">
                {game.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {game.review}
              </p>

              {/* Admin Buttons (edit/delete) */}
              {isAdmin && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit', game.id);
                    }}
                    className="text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(game.id);
                    }}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold shadow-md"
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
              className="flex items-center justify-center bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/20 rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-transform text-primary-600 dark:text-primary-400 text-6xl font-extrabold select-none"
              style={{ aspectRatio: '1 / 1' }}
            >
              +
            </div>
          )}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/30 rounded-xl p-8 max-w-lg w-full relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white text-2xl font-bold transition"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold mb-5 text-primary-700 dark:text-primary-300">
              {selectedGame.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedGame.review}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
