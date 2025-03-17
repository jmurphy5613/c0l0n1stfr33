import { BoardPieceData, BoardPieceType } from "@/models/GameTypes";

interface BoardPieceProps {
    type: BoardPieceType;
    rollNumber: number | null;
}

const BoardPieceBackground: React.FC<{ color: string }> = ({ color }) => {
    return (
        <svg
            width="88"
            height="98"
            viewBox="0 0 88 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M39 1.88675C42.094 0.100423 45.906 0.100423 49 1.88675L82.3013 21.1132C85.3953 22.8996 87.3013 26.2008 87.3013 29.7735V68.2265C87.3013 71.7992 85.3953 75.1004 82.3013 76.8868L49 96.1132C45.906 97.8996 42.094 97.8996 39 96.1132L5.69873 76.8868C2.60472 75.1004 0.69873 71.7992 0.69873 68.2265V29.7735C0.69873 26.2008 2.60472 22.8996 5.69873 21.1132L39 1.88675Z"
                fill={color}
            />
        </svg>
    );
};

const BoardPiece: React.FC<BoardPieceProps> = ({ type }) => {
    return (
        <div>
            <BoardPieceBackground color={BoardPieceData[type].color} />
        </div>
    )
};

export default BoardPiece;
