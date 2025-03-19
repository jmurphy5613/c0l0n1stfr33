export enum BoardPieceType {
    Desert = "Desert",
    Forest = "Forest",
    Rock = "Rock",
    Wheat = "Wheat",
    Brick = "Brick",
    Sheep = "Sheep",
}

export interface BoardPieceInfo {
    color: string;
}

export const BoardPieceData: Record<BoardPieceType, BoardPieceInfo> = {
    [BoardPieceType.Desert]: { color: "#C2B280" },
    [BoardPieceType.Forest]: { color: "#228B22" },
    [BoardPieceType.Rock]: { color: "#808080" },
    [BoardPieceType.Wheat]: { color: "#FFD700" },
    [BoardPieceType.Brick]: { color: "#B22222" },
    [BoardPieceType.Sheep]: { color: "#8FBC8F" },
};

export interface BoardPieceState {
    type: BoardPieceType;
    rollNumber: number | null; // null if desert
}


//3x+1 derives the number of rows/cols in the board
export interface Coordiantes {
    xVert: number;
    yVert: number;
}

export interface SettlementState {
    location: Coordiantes,
}

export interface RoadState {
    start: Coordiantes,
    end: Coordiantes
}

export interface GameState {
    board: BoardPieceState[][],
}