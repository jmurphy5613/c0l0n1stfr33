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
    roads: boolean[]; // 0-5 clockwise from top
}

export interface GameState {
    board: [],
    players: [],
}