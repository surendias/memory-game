import React from "react";
import { render, screen } from "@testing-library/react";
import Leaderboard from "./Leaderboard";

describe("Leaderboard", () => {
  const mockLeaderboard = [
    { name: "Alice", moves: 10 },
    { name: "Bob", moves: 15 },
    { name: "Charlie", moves: 20 },
  ];

  it("renders leaderboard title", () => {
    render(<Leaderboard leaderboard={mockLeaderboard} />);
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });

  it("renders correct number of entries", () => {
    render(<Leaderboard leaderboard={mockLeaderboard} />);
    const entries = screen.getAllByRole("listitem");
    expect(entries).toHaveLength(3);
  });

  it("displays player names and scores correctly", () => {
    render(<Leaderboard leaderboard={mockLeaderboard} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("10 moves")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("15 moves")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("20 moves")).toBeInTheDocument();
  });

  it("displays message when leaderboard is empty", () => {
    render(<Leaderboard leaderboard={[]} />);
    expect(
      screen.getByText("No scores yet. Be the first to play!")
    ).toBeInTheDocument();
  });
});
