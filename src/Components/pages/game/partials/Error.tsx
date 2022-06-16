import { useDispatch, useSelector } from 'react-redux';
import { FiAlertCircle as IconFailure, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { messages } from 'Utils/constants';
import { rdxReturnToWelcomeAsync } from 'Redux-Manager/actions/puzzleActions';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function GameError(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);

  const buttonReturnHandler = () => {
    dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
  };

  return (
    <div className="puzzle puzzle-error">
      <IconFailure className="icon error-icon" />
      <p className="message error-message">{messages.text.connectionError}</p>
      <button type="button" className="action-return" onClick={buttonReturnHandler}>
        <IconReturn className="action-return-icon" />
        <span>{messages.text.return}</span>
      </button>
    </div>
  );
}

export default GameError;
