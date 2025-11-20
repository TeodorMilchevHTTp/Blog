import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../subComponents/GameCard";
import SearchBar from "../subComponents/SearchBar";
import GameModal from "../subComponents/GameModal";
import EditModal from "../subComponents/EditModal";

const reviewTemplate = `# Game Overview
- 

# Gameplay
- 

# Graphics & Sound
- 

# Story
- 

# Pros
- 

# Cons
- 

# Conclusion
- 

# Images (uploaded images will be inserted below)
`;

const Games = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [viewingGame, setViewingGame] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load games + check admin
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAdmin(user && JSON.parse(user).role === "admin");

    const loadGames = async () => {
      const res = await fetch("/games");
      const data = await res.json();
      setGames(data);
    };
    loadGames();
  }, []);

  // Handlers
  const handleAddGame = async (game) => {
    const res = await fetch("/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: game.name || game.title,
        review: "",
        imageUrl: game.background_image || "",
        releaseDate: game.released || "",
        genres: game.genres?.map((g) => g.name) || [],
        rating: game.rating || null,
        steam_url: game.steam_url || "",
        status: "played",
      }),
    });
    const savedGame = await res.json();
    setGames((prev) => [savedGame, ...prev]);
  };

  const handleRemoveGame = async (gameId) => {
    const user = localStorage.getItem("user");
    try {
      await fetch(`/games/${gameId}`, {
        method: "DELETE",
        headers: { "x-user": user },
      });
      setGames((prev) => prev.filter((g) => g._id !== gameId));
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleSaveThoughts = (updatedGame) => {
    setGames((prev) =>
      prev.map((g) => (g._id === updatedGame._id ? updatedGame : g))
    );
    setEditingGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#06070c] to-[#07101a] text-cyan-300 antialiased px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          {/* Back Button (on the left) */}
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-400 hover:text-cyan-300 transition font-semibold text-lg"
          >
            ← Back
          </button>
          
          {/* Search Bar (on the right, only for admin) */}
          {isAdmin && (
            <div className="ml-6 w-64 sm:w-80">
              <SearchBar onAddGame={handleAddGame} />
            </div>
          )}
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {games.map((game) => (
            <GameCard
              key={game._id}
              game={game}
              isAdmin={isAdmin}
              handleRemoveGame={handleRemoveGame}
              setEditingGame={setEditingGame}
              onView={setViewingGame}
            />
          ))}
        </div>
      </div>

      {viewingGame && (
        <GameModal game={viewingGame} onClose={() => setViewingGame(null)} />
      )}

      {editingGame && (
        <EditModal
          game={editingGame}
          onClose={() => setEditingGame(null)}
          reviewTemplate={reviewTemplate}
          onSave={handleSaveThoughts}
        />
      )}
    </div>
    
  );
};

export default Games;
