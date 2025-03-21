import { BoardPieceType, GameState } from '@/models/GameTypes';
import CatanBoard from './components/CatanBoard';

export default function Home() {

	const gameState: GameState = {
		board: [
			[{ type: BoardPieceType.Rock, rollNumber: 2 }, { type: BoardPieceType.Wheat, rollNumber: 3 }, { type: BoardPieceType.Rock, rollNumber: 4 }],
			[{ type: BoardPieceType.Sheep, rollNumber: 5 }, { type: BoardPieceType.Desert, rollNumber: null }, { type: BoardPieceType.Forest, rollNumber: 6 }, { type: BoardPieceType.Brick, rollNumber: 8 }],
			[{ type: BoardPieceType.Wheat, rollNumber: 9 }, { type: BoardPieceType.Rock, rollNumber: 10 }, { type: BoardPieceType.Sheep, rollNumber: 11 }, { type: BoardPieceType.Forest, rollNumber: 12 }, { type: BoardPieceType.Brick, rollNumber: 13 }],
			[{ type: BoardPieceType.Rock, rollNumber: 14 }, { type: BoardPieceType.Wheat, rollNumber: 15 }, { type: BoardPieceType.Sheep, rollNumber: 16 }, { type: BoardPieceType.Forest, rollNumber: 17 }],
			[{ type: BoardPieceType.Brick, rollNumber: 18 }, { type: BoardPieceType.Wheat, rollNumber: 19 }, { type: BoardPieceType.Rock, rollNumber: 20 }],
		],

	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<CatanBoard gameState={gameState} />
		</main>
	);
}
