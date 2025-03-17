import { BoardPieceType } from "@/models/GameTypes";
import BoardPiece from "./Board/BoardPiece";

interface CatanBoardProps {
	board: BoardPieceType[][];
}

const CatanBoard: React.FC<CatanBoardProps> = ({ board }) => {
	return (
		<div>
			{board.map((row, i) => (
				<div key={i} className="flex justify-center">
					{row.map((piece, j) => (
						<div key={j} className="" style={{ position: "relative", bottom: i * 13, paddingRight: 10 }}>
							<BoardPiece type={piece} />
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default CatanBoard;
