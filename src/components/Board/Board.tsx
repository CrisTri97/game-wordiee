import React from "react";
import KeyBoard from "../Keyboard/KeyBoard";
import Square from "../Square/Square";
import "./board.css";

interface IProps {
  board: string[];
}

const Board: React.FC<IProps> = (props) => {
  const { board } = props;
  return (
    <>
      <div className="board">
        {board.map((square, index) => {
          return (
            <div key={index}>
              <Square val={square} squareIndex={index} />
            </div>
          );
        })}
      </div>
      <div className="keyboard">
        <KeyBoard />
      </div>
    </>
  );
};

export default Board;
