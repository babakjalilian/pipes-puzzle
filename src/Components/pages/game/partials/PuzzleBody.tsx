import { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import { IReduxState } from 'Redux-Manager';
import { rdxrotatePuzzleCellAsync } from 'Redux-Manager/actions/puzzleActions';
import { constants } from 'Utils/constants';
import PuzzleRow from './PuzzleRow';



function PuzzleBody(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);
  const puzzleDataDimension = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleDataDimension);
  const puzzleRemainingValidationAttempt = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleRemainingValidationAttempt);
  const [stateBounceClassName, setStateBounceClassName] = useState<string>('');

  useEffect(() => {
    if(puzzleRemainingValidationAttempt !== constants.api.remainingVerifyAttemptCount){
      setStateBounceClassName(' puzzle-bounce');
      const toggleClassDelay = setTimeout(() => {
        setStateBounceClassName('');
        clearTimeout(toggleClassDelay);
      }, 600);
    }
  }, [ puzzleRemainingValidationAttempt]);

  
  const renderRow = ( props:{ key:string, index:number, style:CSSProperties} ) => {
    return (
      <PuzzleRow key={props.key} rowIndex={props.index} style={props.style} ></PuzzleRow>
    );
  };

  const buttonRotateHandler=(event:React. MouseEvent<HTMLElement>)=>{
    const target = event.target as HTMLTextAreaElement;
    if(target.className==='puzzle-cell'){
      const [cellY,cellX]=target.id.split('_');
      if (puzzleWebSocket) {
        dispatch(rdxrotatePuzzleCellAsync({ webSocket: puzzleWebSocket, cellX: +cellX, cellY: +cellY }));
      }
    }
  };

  const height=puzzleDataDimension[0] < 18 ? puzzleDataDimension[0] : 18 ;
  return (
    <div className={`puzzle-body${stateBounceClassName} attempt-${puzzleRemainingValidationAttempt}`} onClick={(event:React. MouseEvent<HTMLElement>)=>buttonRotateHandler(event)}>
      <List
        width={puzzleDataDimension[0]*40}
        height={height*40}
        rowRenderer={renderRow}
        rowCount={puzzleDataDimension[0]}
        rowHeight={40}
      />
    </div>
  );
}

export default PuzzleBody;
