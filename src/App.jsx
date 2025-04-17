import { useState } from 'react';
function Square({value,squareClick}) {
  
  return (
    <button className="bg-white border border-gray-400 w-12 h-12 text-lg m-1 leading-1" onClick={squareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext,squares,onPlay}) {
  
  const winner = calculateWinner(squares)
  let status;
  if(winner){
    status = `winner is ${winner}`
  }else{
    status = `Next player is ${xIsNext ? 'X' : 'O'}`
  }
  console.log(squares)
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] = 'X'
    }else{
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)
    
  }
  return (
    <>
    <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} squareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} squareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} squareClick={()=>handleClick(2)}/>
      </div>
      <div className="flex">
        <Square value={squares[3]} squareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} squareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} squareClick={()=>handleClick(5)}/>
      </div>
      <div className="flex">
        <Square value={squares[6]} squareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} squareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} squareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setxIsNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  function handlePlay(nextSquares) {
    
    const nextHistory = [...history.slice(0,currentMove +1),nextSquares]
    // setHistory([...history, nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setxIsNext(!xIsNext)
  }
  function jumpTo(move){
    setCurrentMove(move)
    setxIsNext(move % 2 === 0)
  }
  const moves = history.map((squares,move)=>{
    let description;
    if (move > 0){
      description = `Go to move #${move}`
    }else{
      description = 'Go to game start'
    }
    return(
      <li key={move} className="transition-all hover:text-amber-800 hover:font-bold">
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return(
    <div className="flex justify-center p-4">
      <div className="mr-16">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="border border-gray-400 p-4">
        <ol>{moves}</ol>
      </div>
    </div>
  )
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i =0; i<lines.length; i++){
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}