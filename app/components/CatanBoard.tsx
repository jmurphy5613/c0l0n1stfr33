import { BoardPieceType, GameState } from "@/models/GameTypes";
import BoardPiece from "./Board/BoardPiece";

interface CatanBoardProps {
	gameState: GameState;
}

const CatanBoard: React.FC<CatanBoardProps> = ({ gameState }) => {

	return (
		<div className="relative">
			<div className="absolute top-0 left-0 w-full h-full bg-blue-500">
				<div 
					style={{
						height: 10,
						width: 10,
						backgroundColor: "white",
						borderRadius: "50%",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)"
					}}
				/>
			</div>
			{/* {buildingsArray.map((row, i) => (
				<div key={i} className="flex justify-center">
					{row.map((piece, j) => (
						<div 
							style={{
								height: 10,
								width: 10,
								backgroundColor: "white",
								borderRadius: "50%",
								
							}}
						/>
					))}
				</div>
			))} */}
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
