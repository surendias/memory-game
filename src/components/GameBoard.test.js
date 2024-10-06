import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import GameBoard from "./GameBoard";

describe("GameBoard", () => {
  const mockTiles = ["🍎", "🍌", "🍇", "🍊"];
  const mockHandleTileClick = jest.fn();

  it("renders correct number of tiles", () => {
    render(
      <GameBoard
        tiles={mockTiles}
        flippedIndices={[]}
        matchedPairs={[]}
        handleTileClick={mockHandleTileClick}
      />
    );
    const tiles = screen.getAllByRole("button");
    expect(tiles).toHaveLength(4);
  });

  it("displays ? on unflipped tiles", () => {
    render(
      <GameBoard
        tiles={mockTiles}
        flippedIndices={[]}
        matchedPairs={[]}
        handleTileClick={mockHandleTileClick}
      />
    );
    const tiles = screen.getAllByRole("button");
    tiles.forEach((tile) => {
      expect(tile).toHaveTextContent("?");
    });
  });

  it("displays correct emoji on flipped tile", () => {
    render(
      <GameBoard
        tiles={mockTiles}
        flippedIndices={[0]}
        matchedPairs={[]}
        handleTileClick={mockHandleTileClick}
      />
    );
    const flippedTile = screen.getByText("🍎");
    expect(flippedTile).toBeInTheDocument();
  });

  it("calls handleTileClick with correct index when tile is clicked", () => {
    render(
      <GameBoard
        tiles={mockTiles}
        flippedIndices={[]}
        matchedPairs={[]}
        handleTileClick={mockHandleTileClick}
      />
    );
    const tiles = screen.getAllByRole("button");
    act(() => {
      fireEvent.click(tiles[2]);
    });
    expect(mockHandleTileClick).toHaveBeenCalledWith(2);
  });

  it("disables matched tiles", () => {
    render(
      <GameBoard
        tiles={mockTiles}
        flippedIndices={[]}
        matchedPairs={[0, 1]}
        handleTileClick={mockHandleTileClick}
      />
    );
    const tiles = screen.getAllByRole("button");
    expect(tiles[0]).toBeDisabled();
    expect(tiles[1]).toBeDisabled();
    expect(tiles[2]).not.toBeDisabled();
    expect(tiles[3]).not.toBeDisabled();
  });
});
