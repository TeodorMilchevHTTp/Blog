import React from "react";

const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md p-4 overflow-auto"
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-[#07101a] to-[#021019] rounded-3xl shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-64 md:h-80 rounded-t-3xl overflow-hidden">
          <img
            src={game.background_image || game.imageUrl}
            alt={`${game.title} banner`}
            className="absolute inset-0 w-full h-full object-cover brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {game.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          {/* Left: Review Section */}
          <div className="md:w-2/3 text-cyan-300 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-cyan-700 pb-2">
              <h2 className="text-2xl font-semibold">Review</h2>
              <div className="flex gap-6 text-xs md:text-sm text-cyan-300">
                {/* Genres */}
                {game.genres && (
                  <span className="font-semibold">
                    {game.genres.join(", ")}
                  </span>
                )}

                {/* Release Date */}
                {game.releaseDate && (
                  <span className="text-cyan-400">
                    Release: {game.releaseDate}
                  </span>
                )}

                {/* Rating */}
                {game.rating && (
                  <span className="text-yellow-300">
                    Rating: {game.rating}/5
                  </span>
                )}
              </div>
            </div>
            <pre className="whitespace-pre-line break-words text-sm md:text-base">
              {game.fullReview || game.review || "No review available."}
            </pre>
          </div>

          {/* Right: Game Info Section */}
          <div className="md:w-1/3 flex flex-col space-y-6 text-cyan-300">
            {/* Steam Button */}
            {game.steam_url && (
              <a
                href={game.steam_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 shadow-md"
              >
                <span>View on Steam</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12l9 9m0 0l-9 9m9-9H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition-all transform hover:scale-110"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameModal;
 