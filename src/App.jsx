import { useState } from "react";
function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);
  // function handleClick () {
  //   setValue('X');
  // }
  return (
    <>
      <button
        className="hover:bg-primary rounded-none text-white h-12 w-12 font-bold bg-grey border"
        onClick={onSquareClick}
      >
        {value}
      </button>
    </>
  );
}

function Board({xIsNext,onPlay,squares }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner winner chicken dinner. Winner is :" + winner;
  } else {
    status = "Next player is :" + (xIsNext ? "X" : "O");
  }
  return (
    <div className="w-32 mt-5">
      <div className="grid grid-cols-3 m-auto">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
      <p className="">{status}</p>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo (nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move#' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="bg-primary text-white py-1 px-2 mt-1 rounded" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div>
      <div>
        <Board onPlay={handlePlay} xIsNext={xIsNext} squares={currentSquares} />
      </div>
      <div className="mt-5">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
