import { useSelector } from 'react-redux';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function PuzzleCell(props:{id:string}): JSX.Element {
  const [rowIndex,cellIndex]=props.id.split('_');
  const  data  = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleData[+rowIndex][+cellIndex]);
  return (
    <button key={+cellIndex} id={props.id} className={'puzzle-cell'} >{data}</button>
  );
}

export default PuzzleCell;
