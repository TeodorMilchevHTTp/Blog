const SearchResults = ({ results, onAddGame }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-6 p-3 bg-[#01050f]/90 rounded-xl border border-cyan-600 shadow-lg max-h-96 overflow-y-auto">
      {results.map((game) => (
        <div
          key={game.id}
          onClick={() => onAddGame(game)}
          className="cursor-pointer bg-gradient-to-br from-[#021019] to-[#061024] p-3 rounded-xl border border-cyan-600 hover:shadow-[0_0_20px_cyan] transition flex flex-col items-center"
        >
          <img
            src={game.background_image}
            alt={game.title || game.name}
            className="w-full h-28 object-cover rounded-lg mb-2"
          />
          <p className="truncate text-center text-sm font-semibold text-cyan-200">
            {game.title || game.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
