import { BoardPieceType, GameState } from "@/models/GameTypes";
import BoardPiece from "./Board/BoardPiece";

interface CatanBoardProps {
	gameState: GameState;
}

const CatanBoard: React.FC<CatanBoardProps> = ({ gameState }) => {
	return (
		<div>
			{gameState.board.map((row, i) => (
				<div key={i} className="flex justify-center">
					{row.map((piece, j) => (
						<div key={j} className="" style={{ position: "relative", bottom: i * 13, paddingRight: 10 }}>
							<BoardPiece type={piece.type} rollNumber={piece.rollNumber} />
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default CatanBoard;
