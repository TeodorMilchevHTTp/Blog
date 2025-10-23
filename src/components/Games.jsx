import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  const [games, setGames] = useState([]); // start empty
  const [selectedGame, setSelectedGame] = useState(null);
  const [editGame, setEditGame] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [steamGames, setSteamGames] = useState([]);

  // Check if user is admin
  const isAdmin = (() => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).role === 'admin';
  })();

  // Fetch Steam games on mount
  useEffect(() => {
    async function fetchSteamGames() {
      try {
        const res = await fetch('/api/steam/games');
        const data = await res.json();
        setSteamGames(data.applist.apps.slice(0, 1000));
      } catch (err) {
        console.error(err);
      }
    }
    fetchSteamGames();
  }, []);

  // Fetch games from backend on mount
  useEffect(() => {
  async function fetchGames() {
    try {
      const res = await fetch('/games');
      if (!res.ok) throw new Error('Failed to fetch games');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error('Error loading games from DB:', err);
    }
  }

  fetchGames();
}, []);


 // Delete game handler
  const handleDelete = (id) => {
    if (!isAdmin) return;
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  // View game details handler
  const handleCardClick = (game) => setSelectedGame(game);
  const closeModal = () => setSelectedGame(null);
  const handleAddNewGameClick = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  // Add new game handler
  const handleSelectSteamGame = async (game) => {
  try {
    const newGame = {
      title: game.name,
      review: 'No opinion yet. (Admin can edit this)',
      appid: game.appid,
      imageUrl: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/capsule_231x87.jpg`,
    };

    const res = await fetch('/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame),
    });

    if (!res.ok) throw new Error('Failed to save game');
    const saved = await res.json();
    setGames((prev) => [saved, ...prev]);
    setShowAddModal(false);
  } catch (err) {
    console.error('Error adding game:', err);
  }
};

  // Edit game handler
  const handleEditClick = (game) => {
    setEditGame(game);
    setNewReview(game.review || '');
  };

  // Save edited review handler
  const handleSaveEdit = async () => {
  if (!isAdmin || !editGame) return;

  try {
    const res = await fetch(`/games/${editGame._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: newReview }),
    });

    if (!res.ok) throw new Error('Failed to update review');
    const updated = await res.json();

    setGames((prev) =>
      prev.map((g) => (g._id === updated._id ? updated : g))
    );
    setEditGame(null);
  } catch (err) {
    console.error('Error updating game:', err);
  }
};

  // Filter Steam games based on search query
  const filteredSteamGames = steamGames.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              &larr; Back to Dashboard
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
              className="bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/20 p-4 rounded-xl shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.03] transition-transform relative group"
            >
              {game.appid && (
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/capsule_231x87.jpg`}
                  alt={game.title}
                  className="rounded-md mb-3 w-full object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <h2 className="text-2xl font-semibold mb-2 text-primary-700 dark:text-primary-300">
                {game.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {game.review}
              </p>

              {isAdmin && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(game);
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

          {isAdmin && (
            <div
              onClick={handleAddNewGameClick}
              className="flex items-center justify-center bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/20 rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-transform text-primary-600 dark:text-primary-400 text-6xl font-extrabold select-none"
              style={{ aspectRatio: '1 / 1' }}
            >
              +
            </div>
          )}
        </div>
      </div>

      {/* Add Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 pt-20 px-4">
          <div className="bg-light-card dark:bg-[#1f1f1f] rounded-xl p-6 max-w-4xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary-100">Add New Game</h2>
              <button
                onClick={closeAddModal}
                className="text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <input
              type="text"
              placeholder="Search Steam Games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white mb-4"
            />

            {searchQuery && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {filteredSteamGames.map((game) => (
                  <div
                    key={game.appid}
                    onClick={() => handleSelectSteamGame(game)}
                    className="cursor-pointer hover:scale-105 transition-transform text-center"
                  >
                    <img
                      src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/capsule_231x87.jpg`}
                      alt={game.name}
                      className="rounded-md mb-2 w-full object-cover"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{game.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Game Modal (for all users) */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/30 rounded-xl p-8 max-w-lg w-full relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white text-2xl font-bold transition"
            >
              &times;
            </button>

            {selectedGame.appid && (
              <img
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${selectedGame.appid}/capsule_231x87.jpg`}
                alt={selectedGame.title}
                className="rounded-md mb-4 w-full object-cover"
              />
            )}

            <h2 className="text-3xl font-extrabold mb-5 text-primary-700 dark:text-primary-300">
              {selectedGame.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedGame.review}
            </p>
          </div>
        </div>
      )}

      {/* Edit Game Modal (admin only) */}
      {editGame && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-light-card dark:bg-[#1f1f1f] border border-gray-300 dark:border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setEditGame(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-white text-2xl font-bold transition"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary-700 dark:text-primary-300">
              Edit Your Opinion for {editGame.title}
            </h2>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white mb-4"
              rows={4}
            />
            <button
              onClick={handleSaveEdit}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-md shadow-md transition"
            >
              Save Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
