import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

jest.mock("./components/GameBoard", () => {
  return function MockGameBoard({ handleTileClick }) {
    return (
      <div data-testid="game-board" onClick={() => handleTileClick(0)}></div>
    );
  };
});

jest.mock("./components/Leaderboard", () => {
  return function MockLeaderboard() {
    return <div data-testid="leaderboard"></div>;
  };
});

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Memory Game")).toBeInTheDocument();
  });

  it("initializes game state correctly", () => {
    render(<App />);
    expect(screen.getByText(/Moves:/)).toHaveTextContent("Moves: 0");
  });

  it("updates moves when tiles are clicked", () => {
    render(<App />);
    const gameBoard = screen.getByTestId("game-board");

    act(() => {
      fireEvent.click(gameBoard);
    });

    act(() => {
      fireEvent.click(gameBoard);
    });

    const movesElement = screen.getByText(/Moves:/);
    expect(movesElement).toHaveTextContent("Moves: 0");
  });

  it("resets game when New Game button is clicked", () => {
    render(<App />);
    const gameBoard = screen.getByTestId("game-board");

    act(() => {
      fireEvent.click(gameBoard);
      fireEvent.click(gameBoard);
    });

    const newGameButton = screen.getByText("New Game");
    act(() => {
      fireEvent.click(newGameButton);
    });

    const movesElement = screen.getByText(/Moves:/);
    expect(movesElement).toHaveTextContent("Moves: 0");
  });
});
