import { FiCheckCircle as IconValidate, FiFrown as IconGiveUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { rdxReturnToWelcomeAsync, rdxValidateExistingPuzzleAsync } from 'Redux-Manager/actions/puzzleActions';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';
import { messages } from 'Utils/constants';
import { getWebSocketReadyStateDesc } from 'Utils/enumerations';



function PuzzleActions(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleRemainingValidationAttempt = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleRemainingValidationAttempt);
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);
  const puzzleLevel = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleLevel);
  const puzzleVerifyEnable = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleVerifyEnable);

  const buttonValidateHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxValidateExistingPuzzleAsync(puzzleWebSocket, puzzleLevel));
    }
  };

  const buttonReturnHandler = () => {
    dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
  };

  return (
    <div className="puzzle-actions">
      <span className="puzzle-level">{messages.text.levelPrefix} {puzzleLevel}</span>
      <div className="action-buttons-wrapper">
        <button type="button" className="action-button" onClick={buttonReturnHandler}>
          <IconGiveUp className="action-icon" />
          <span>{messages.text.giveUp}</span>
        </button>
        <button type="button" className="action-button action-validate" onClick={buttonValidateHandler} disabled={!puzzleVerifyEnable}>
          <IconValidate className="action-icon" />
          <span>{messages.text.check}</span>
        </button>
      </div>
      <div className="info">
        <p className="info-message">
          <span>{messages.text.remainingVerifyAttemptText}</span>
          <span className="count">{puzzleRemainingValidationAttempt}</span>
        </p>
        <p className={`info-connection-state state_${puzzleWebSocket?.readyState || ''}`}>{getWebSocketReadyStateDesc(puzzleWebSocket?.readyState)}</p>
      </div>
    </div>
  );
}

export default PuzzleActions;
