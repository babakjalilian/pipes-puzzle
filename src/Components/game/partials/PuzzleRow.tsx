import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';
import PuzzleCell from './PuzzleCell';


function PuzzleRow(props:{rowIndex:number,style:CSSProperties}): JSX.Element {

  const puzzleDataDimension = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleDataDimension);

  const cells = [];
  for (let cellIndex = 0; cellIndex < puzzleDataDimension[1]; cellIndex++) {
    cells.push(<PuzzleCell key={`${props.rowIndex}_${cellIndex}`} id={`${props.rowIndex}_${cellIndex}`}></PuzzleCell>);
  }
  
  return (
    <div key={props.rowIndex} className="puzzle-row" style={props.style}>
      {cells}
    </div>
  );
}

export default PuzzleRow;
