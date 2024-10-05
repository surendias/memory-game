import React from "react";

const GameBoard = ({
  tiles,
  flippedIndices,
  matchedPairs,
  handleTileClick,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tiles.map((tile, index) => (
        <button
          key={index}
          className={`w-20 h-20 text-3xl flex items-center justify-center rounded-lg transition-all duration-300 ${
            flippedIndices.includes(index) || matchedPairs.includes(index)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-transparent"
          } ${
            matchedPairs.includes(index)
              ? "opacity-50 cursor-default"
              : "opacity-100"
          }`}
          onClick={() => handleTileClick(index)}
          disabled={matchedPairs.includes(index)}
        >
          {flippedIndices.includes(index) || matchedPairs.includes(index)
            ? tile
            : "?"}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
