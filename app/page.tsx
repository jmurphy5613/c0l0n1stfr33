import { BoardPieceType } from '@/models/GameTypes';
import CatanBoard from './components/CatanBoard';

export default function Home() {

	const board = [
		[BoardPieceType.Brick, BoardPieceType.Wheat, BoardPieceType.Rock],
		[BoardPieceType.Sheep, BoardPieceType.Desert, BoardPieceType.Forest, BoardPieceType.Brick],
		[BoardPieceType.Wheat, BoardPieceType.Rock, BoardPieceType.Sheep, BoardPieceType.Forest, BoardPieceType.Brick],
		[BoardPieceType.Rock, BoardPieceType.Wheat, BoardPieceType.Sheep, BoardPieceType.Forest],
		[BoardPieceType.Brick, BoardPieceType.Wheat, BoardPieceType.Rock],
	]

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<CatanBoard board={board} />
		</main>
	);
}
