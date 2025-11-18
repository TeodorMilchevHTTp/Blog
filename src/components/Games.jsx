import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaTimes, FaRegEye } from 'react-icons/fa';

// ----------------------------
// GameCard Component
// ----------------------------
const GameCard = ({ game, colId, moveGame, isAdmin, handleRemoveGame, setEditingGame, onView }) => (
  <div
    onClick={() => onView(game)}
    className="relative flex items-center bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 p-3 rounded-xl shadow mb-2 transition-colors duration-500 cursor-pointer hover:scale-105 hover:shadow-lg"
  >
    {/* Thumbnail on the left */}
    {(game.background_image || game.imageUrl) && (
      <img
        src={game.background_image || game.imageUrl}
        alt={game.title}
        className="w-24 h-24 object-cover rounded mr-4 flex-shrink-0"
      />
    )}

    {/* Text content */}
    <div className="flex-1">
      <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
        {game.title}
      </h3>
      {game.review && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {game.review}
        </p>
      )}
    </div>

    {/* Admin Buttons */}
    {isAdmin && (
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={(e) => { e.stopPropagation(); handleRemoveGame(colId, game._id); }}
          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-300"
        >
          <FaTimes size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setEditingGame(game); }}
          className="p-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-colors duration-300"
        >
          <FaRegEye size={12} />
        </button>
      </div>
    )}

    {/* Move Buttons */}
    {isAdmin && colId !== 'played' && (
      <button
        onClick={(e) => { e.stopPropagation(); moveGame(game._id, colId, 'left'); }}
        className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
      >
        <FaArrowLeft size={12} />
      </button>
    )}
    {isAdmin && colId !== 'wishlist' && (
      <button
        onClick={(e) => { e.stopPropagation(); moveGame(game._id, colId, 'right'); }}
        className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
      >
        <FaArrowRight size={12} />
      </button>
    )}
  </div>
);

// ----------------------------
// Games Page Component
// ----------------------------
const Games = () => {
  const [columns, setColumns] = useState({ played: [], current: [], wishlist: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [newThoughts, setNewThoughts] = useState('');
  const [viewingGame, setViewingGame] = useState(null);

  const isAdmin = (() => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).role === 'admin';
  })();

  // Load games from DB
  useEffect(() => {
    const loadGames = async () => {
      const res = await fetch('/games');
      const data = await res.json();
      setColumns({
        played: data.filter(g => g.status === 'played'),
        current: data.filter(g => g.status === 'current'),
        wishlist: data.filter(g => g.status === 'wishlist'),
      });
    };
    loadGames();
  }, []);

  // RAWG Search
  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    const res = await fetch(`/games/rawg?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSearchResults(data);
  };

  // Add a new game to DB
  const handleAddGame = async (game) => {
    const res = await fetch('/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: game.name || game.title,
        review: '',
        imageUrl: game.background_image || '',
        status: 'current'
      }),
    });

    const savedGame = await res.json();

    setColumns(prev => ({
      ...prev,
      current: [savedGame, ...prev.current],
    }));

    setSearchQuery('');
    setSearchResults([]);
  };

  // Move game between columns & update DB
  const moveGame = async (gameId, colId, direction) => {
    if (!isAdmin) return;

    const targetColId =
      direction === 'left'
        ? (colId === 'current' ? 'played' : 'current')
        : (colId === 'current' ? 'wishlist' : 'current');

    await fetch(`/games/${gameId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-user': localStorage.getItem('user') },
      body: JSON.stringify({ status: targetColId }),
    });

    setColumns(prev => {
      const newCols = { ...prev };
      const moved = newCols[colId].find(g => g._id === gameId);
      newCols[colId] = newCols[colId].filter(g => g._id !== gameId);
      newCols[targetColId] = [moved, ...newCols[targetColId]];
      return newCols;
    });
  };

  // Save review (DB update)
  const handleSaveThoughts = async () => {
    await fetch(`/games/${editingGame._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: newThoughts }),
    });

    setColumns(prev => {
      const newCols = { ...prev };
      Object.keys(newCols).forEach(col => {
        newCols[col] = newCols[col].map(g =>
          g._id === editingGame._id ? { ...g, review: newThoughts } : g
        );
      });
      return newCols;
    });

    setEditingGame(null);
    setNewThoughts('');
  };

  // Remove from DB
  const handleRemoveGame = async (colId, gameId) => {
    await fetch(`/games/${gameId}`, { method: 'DELETE' });
    setColumns(prev => ({
      ...prev,
      [colId]: prev[colId].filter(g => g._id !== gameId),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-white px-6 py-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-8">

        <Link
          to="/"
          className="text-primary-600 dark:text-primary-100 hover:underline transition-colors duration-300"
        >
          &larr; Back
        </Link>

        {/* Search */}
        {isAdmin && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 transition-colors duration-500"
            />

            {searchResults.length > 0 && (
              <div className="mt-2 flex space-x-4 overflow-x-auto py-2">
                {searchResults.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleAddGame(game)}
                    className="flex-none w-40 cursor-pointer border p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-full h-32 object-cover rounded mb-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{game.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Horizontal Sections */}
        <div className="space-y-8">
          {['played', 'current', 'wishlist'].map((colId) => (
            <section
              key={colId}
              className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow transition-colors duration-500"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
                {colId === 'played' ? 'Played' : colId === 'current' ? 'Selected' : 'Wishlist'}
              </h2>

              <div className="flex flex-col space-y-3">
                {columns[colId].map((game) => (
                  <GameCard
                    key={game._id}
                    game={game}
                    colId={colId}
                    moveGame={moveGame}
                    isAdmin={isAdmin}
                    handleRemoveGame={handleRemoveGame}
                    setEditingGame={setEditingGame}
                    onView={setViewingGame}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Zoom Modal */}
        {viewingGame && (
          <div
            onClick={() => setViewingGame(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
          >
            <div
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {viewingGame.title}
              </h3>

              <img
                src={viewingGame.background_image || viewingGame.imageUrl}
                alt={viewingGame.title}
                className="w-full h-80 object-cover rounded mb-4"
              />
              {viewingGame.review && (
                <p className="text-gray-700 dark:text-gray-300 text-center">{viewingGame.review}</p>
              )}

              <button
                onClick={() => setViewingGame(null)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingGame && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl max-w-md w-full shadow-lg transition-colors duration-500">
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Edit Thoughts: {editingGame.title}
              </h2>

              <textarea
                rows={4}
                value={newThoughts}
                onChange={(e) => setNewThoughts(e.target.value)}
                className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 transition-colors duration-500"
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingGame(null)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveThoughts}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Games;
