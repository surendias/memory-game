import React, { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import GameBoard from "./components/GameBoard";
import Leaderboard from "./components/Leaderboard";

const items = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍍", "🥝"];

function App() {
  const [tiles, setTiles] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    initializeGame();
    const storedLeaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );
    setLeaderboard(storedLeaderboard);
  }, []);

  const initializeGame = () => {
    const shuffledItems = [...items, ...items].sort(() => Math.random() - 0.5);
    setTiles(shuffledItems);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleTileClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(index) ||
      gameOver
    )
      return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        setMatchedPairs((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
        if (matchedPairs.length + 2 === tiles.length) {
          setGameOver(true);
          updateLeaderboard();
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const updateLeaderboard = () => {
    const playerName = prompt(
      "Congratulations! Enter your name for the leaderboard:"
    );
    if (playerName) {
      const newLeaderboard = [...leaderboard, { name: playerName, moves }]
        .sort((a, b) => a.moves - b.moves)
        .slice(0, 5);
      setLeaderboard(newLeaderboard);
      localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Memory Game</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Moves: {moves}</p>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              <Shuffle className="mr-2" size={20} />
              New Game
            </button>
          </div>
          <GameBoard
            tiles={tiles}
            flippedIndices={flippedIndices}
            matchedPairs={matchedPairs}
            handleTileClick={handleTileClick}
          />
        </div>
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </div>
  );
}

export default App;
