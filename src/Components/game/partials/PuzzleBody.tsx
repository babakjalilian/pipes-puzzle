import { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import { IReduxState } from 'Redux-Manager';
import { rdxRotatePuzzleCellOnClient, rdxRotatePuzzleCellsOnServer } from 'Redux-Manager/actions/puzzleActions';
import { Socket } from 'Services/Socket';
import { constants } from 'Utils/constants';
import { updateRotationQueue } from 'Utils/helpers';
import PuzzleRow from './PuzzleRow';



function PuzzleBody(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);
  const puzzleDataDimension = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleDataDimension);
  const puzzleRemainingValidationAttempt = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleRemainingValidationAttempt);
  const [stateBounceClassName, setStateBounceClassName] = useState<string>('');
  const socketInstance:Socket= new Socket();
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

  const buttonRotateHandler= (event:React. MouseEvent<HTMLElement>)=>{
    const target = event.target as HTMLTextAreaElement;
    if(target.className==='puzzle-cell'){
      const [cellY,cellX]=target.id.split('_');
      if (puzzleWebSocket) {
        dispatch(rdxRotatePuzzleCellOnClient({ cellX: +cellX, cellY: +cellY }));
        updateRotationQueue(`${cellX} ${cellY}` , socketInstance.rotations);
        dispatch(rdxRotatePuzzleCellsOnServer(puzzleWebSocket,socketInstance.rotations));
      }
    }
  };

  const height=puzzleDataDimension[0] < 18 ? puzzleDataDimension[0] : 18 ;
  return (
    <div className={`puzzle-body${stateBounceClassName} attempt-${puzzleRemainingValidationAttempt}`} onClick={(event:React. MouseEvent<HTMLElement>)=>buttonRotateHandler(event)}>
      <List
        width={puzzleDataDimension[1]*40}
        height={height*40}
        rowRenderer={renderRow}
        rowCount={puzzleDataDimension[0]}
        rowHeight={40}
      />
    </div>
  );
}

export default PuzzleBody;
