import React from "react";
import { FaTimes, FaRegEye } from "react-icons/fa";

const GameCard = ({
  game,
  isAdmin,
  handleRemoveGame,
  setEditingGame,
  onView,
}) => (
  <div
    onClick={() => onView(game)}
    className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#021019] to-[#061024] border border-cyan-600 hover:shadow-[0_0_20px_cyan] transition-all duration-300 group"
  >
    {game.background_image || game.imageUrl ? (
      <img
        src={game.background_image || game.imageUrl}
        alt={game.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
    ) : (
      <div className="w-full h-48 bg-cyan-900 flex items-center justify-center rounded-t-2xl text-cyan-400">
        No Image
      </div>
    )}

    <div className="p-3 bg-gradient-to-t from-black/90 to-black/40 text-cyan-300 font-semibold truncate text-center">
      {game.title}
    </div>

    {isAdmin && (
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveGame(game._id);
          }}
          className="p-2 bg-red-700 hover:bg-red-800 rounded-full text-white shadow-lg"
          aria-label="Delete Game"
        >
          <FaTimes />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingGame(game);
          }}
          className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white shadow-lg"
          aria-label="Edit Game"
        >
          <FaRegEye />
        </button>
      </div>
    )}
  </div>
);

export default GameCard;
