import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import GameLoading from 'Components/pages/game/partials/Loading';
import GameError from 'Components/pages/game/partials/Error';
import GameOver from 'Components/pages/game/partials/GameOver';
import GameActions from 'Components/pages/game/partials/Actions';
import GameNextLevel from 'Components/pages/game/partials/NextLevel';
import PuzzleBody from 'Components/pages/game/partials/PuzzleBody';

import 'Components/pages/game/Game.scss';
import { rdxCreateWebSocketAndPuzzleAsync } from 'Redux-Manager/actions/puzzleActions';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function Game(): JSX.Element {
  const dispatch = useDispatch();
  const puzzleLevel = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleLevel);
  const puzzleIsStarted = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsStarted);
  const puzzleIsLoading = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsLoading);
  const puzzleIsError = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsError);
  const puzzleIsOver = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsOver);
  const puzzleIsNextLevelAvailable = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsNextLevelAvailable);


  useLayoutEffect(() => {
    if (!puzzleIsStarted) {
      dispatch(rdxCreateWebSocketAndPuzzleAsync(puzzleLevel));
    }
  }, [dispatch, puzzleIsStarted, puzzleLevel]);


  if (puzzleIsLoading) {
    return <GameLoading />;
  }

  if (puzzleIsError) {
    return <GameError />;
  }

  return (
    <div className={`puzzle ${puzzleIsNextLevelAvailable ? 'puzzle-success' : ''} ${puzzleIsOver ? 'puzzle-failed' : ''}`}>
      {puzzleIsOver && <GameOver />}
      {(!puzzleIsOver && !puzzleIsNextLevelAvailable) && <GameActions />}
      {puzzleIsNextLevelAvailable && <GameNextLevel />}
      <PuzzleBody />
    </div>
  );
}

export default Game;
