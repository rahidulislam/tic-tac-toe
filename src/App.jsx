import { useState } from 'react';
function Square({value}) {
  function handleClick() {
    
    
  }
  return (
    <button className="bg-white border border-gray-400 w-12 h-12 text-lg m-1 leading-1" onClick={handleClick}>
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  console.log(squares)
  return (
    <>
      <div className="flex">
        <Square value={squares[0]}/>
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>
      </div>
      <div className="flex">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square value={squares[5]}/>
      </div>
      <div className="flex">
        <Square value={squares[6]}/>
        <Square value={squares[7]}/>
        <Square value={squares[8]}/>
      </div>
    </>
  );
}

export default App;
