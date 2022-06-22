import 'Components/game/Game.scss';
import GameOver from 'Components/game/partials/GameOver';
import PuzzleActions from 'Components/game/partials/PuzzleActions';
import PuzzleBody from 'Components/game/partials/PuzzleBody';
import PuzzleError from 'Components/game/partials/PuzzleError';
import PuzzleLoading from 'Components/game/partials/PuzzleLoading';
import PuzzleNextLevel from 'Components/game/partials/PuzzleNextLevel';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    return <PuzzleLoading />;
  }

  if (puzzleIsError) {
    return <PuzzleError />;
  }

  return (
    <div className={`puzzle ${puzzleIsNextLevelAvailable ? 'puzzle-success' : ''} ${puzzleIsOver ? 'puzzle-failed' : ''}`}>
      {puzzleIsOver && <GameOver />}
      {(!puzzleIsOver && !puzzleIsNextLevelAvailable) && <PuzzleActions />}
      {puzzleIsNextLevelAvailable && <PuzzleNextLevel />}
      <PuzzleBody />
    </div>
  );
}

export default Game;
