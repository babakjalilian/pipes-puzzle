import { useDispatch, useSelector } from 'react-redux';
import { FiFrown as IconGameOver, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { messages } from 'Utils/constants';
import { rdxReturnToWelcomeAsync } from 'Redux-Manager/actions/puzzleActions';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function GameOver(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);

  const buttonReturnHandler = () => {
    dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
  };

  return (
    <div className="puzzle-game-over">
      <IconGameOver className="icon game-over-icon" />
      <p className="message game-over-message">{messages.text.gameOverMessage}</p>
      <button type="button" className="action-return action-game-over" onClick={buttonReturnHandler}>
        <IconReturn className="action-return-icon" />
        <span>{messages.text.return}</span>
      </button>
    </div>
  );
}

export default GameOver;
