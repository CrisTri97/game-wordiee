import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decPos, incRow, setBoard } from "../../redux/boardSlice";
import { rootState } from "../interface";
import Key from "../Key/Key";
import "./keyboard.css";
import worldList from "../../world.json";

const KeyBoard: React.FC = () => {
  const board = useSelector((state: rootState) => state.board.board);
  const position = useSelector((state: rootState) => state.board.pos);
  const row = useSelector((state: rootState) => state.board.row);
  const correctWord = useSelector(
    (state: rootState) => state.board.correctWord
  );
  console.log(correctWord);

  const dispatch = useDispatch();
  const rows: string[] = [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m",
  ];
  let allWords: string[] = worldList.words;
  let board5Word: string = `${board[position - 5]}${board[position - 4]}${
    board[position - 3]
  }${board[position - 2]}${board[position - 1]}`.toLowerCase();
  const clickBack = () => {
    if (Math.floor(position - 1) / 5 < row) return;
    const newBoard = [...board];
    newBoard[position - 1] = "";
    dispatch(decPos());
    dispatch(setBoard(newBoard));
  };
  const clickEnter = () => {
    if (allWords.includes(board5Word)) {
      if (position % 5 === 0 && position !== 0) {
        console.log("Entered");
        dispatch(incRow());
      }
    } else if (!allWords.includes(board5Word)) {
      alert("Invalid words");
    }
    if (position === 30 && allWords.includes(board5Word)) {
      alert("Correct word is : " + correctWord);
    }
  };
  return (
    <div className="keyboard-container">
      {rows.map((row, idx) => {
        return (
          <div className="row" key={idx}>
            {idx === 2 && (
              <span className="letter-row" onClick={clickEnter}>
                Enter
              </span>
            )}
            {row.split(" ").map((letter, idx) => {
              return (
                <div className="letter-row" key={idx}>
                  <Key letter={letter.toUpperCase()} />
                  {letter === "m" && <span onClick={clickBack}>Back</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default KeyBoard;
