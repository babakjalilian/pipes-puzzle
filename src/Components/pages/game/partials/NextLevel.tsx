import { useDispatch, useSelector } from 'react-redux';
import { FiGift as IconWellDone, FiArrowRightCircle as IconNextLevel, FiCornerUpLeft as IconReturn } from 'react-icons/fi';

import { constants, messages } from 'Utils/constants';
import { rdxReturnToWelcomeAsync, rdxgoToNextLevelAsync } from 'Redux-Manager/actions/puzzleActions';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function GameNextLevel(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleWebSocket = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleWebSocket);
  const puzzleLevelPassword = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleLevelPassword);
  const puzzleLevel = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleLevel);

  const buttonReturnHandler = () => {
    dispatch(rdxReturnToWelcomeAsync(puzzleWebSocket));
  };

  const buttonNextLevelHandler = () => {
    if (puzzleWebSocket) {
      dispatch(rdxgoToNextLevelAsync(puzzleWebSocket, puzzleLevel));
    }
  };

  return (
    <div className="puzzle-actions">
      <div className="winner">
        <IconWellDone className="icon winner-icon" />
        <p className="winner-message">
          <span>{messages.text.achievemessage}</span>
          <span className="message-highlight">{puzzleLevelPassword}</span>
        </p>
      </div>
      <div className="action-buttons-wrapper">
        <button type="button" className="action-button" onClick={buttonReturnHandler}>
          <IconReturn className="action-icon" />
          <span>{messages.text.return}</span>
        </button>
        {puzzleLevel < constants.api.maxLevel &&
          <button type="button" className="action-button action-next" onClick={buttonNextLevelHandler}>
            <IconNextLevel className="action-icon" />
            <span>{messages.text.nextLevel}</span>
          </button>
        }
        {puzzleLevel >= constants.api.maxLevel &&
          <p className="level-finish">{messages.text.gameFinishedMessage}</p>
        }
      </div>
    </div>
  );
}

export default GameNextLevel;
