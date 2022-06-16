
import { IReduxActionTypes, IReduxActions, IPuzzleDispatch, Dispatch } from 'Redux-Manager/interfaces/puzzle.Interface';
import { createAction } from '@reduxjs/toolkit';
import { IRotatePuzzle, Socket, TPuzzleData } from 'Services/Socket';


const rdxActionTypes: IReduxActionTypes = {
  PUZZLE_STARTED: 'PUZZLE_STARTED',
  PUZZLE_RETURNED: 'PUZZLE_RETURNED',
  PUZZLE_LOADING: 'PUZZLE_LOADING',
  PUZZLE_FAILED: 'PUZZLE_FAILED',
  PUZZLE_CREATED: 'PUZZLE_CREATED',
  PUZZLE_UPDATED: 'PUZZLE_UPDATED',
  PUZZLE_GAMEOVER: 'PUZZLE_GAMEOVER',
  PUZZLE_VALIDATIONATTEMPTDECREASED: 'PUZZLE_VALIDATIONATTEMPTDECREASED',
  PUZZLE_NEXTLEVELAVAILABLE: 'PUZZLE_NEXTLEVELAVAILABLE',
  PUZZLE_NEXTLEVELCREATED: 'PUZZLE_NEXTLEVELCREATED',
};

const puzzleStarted = createAction<number | undefined>(rdxActionTypes.PUZZLE_STARTED);

const puzzleReturned = createAction(rdxActionTypes.PUZZLE_RETURNED);

const puzzleLoading = createAction(rdxActionTypes.PUZZLE_LOADING);

const puzzleFailed = createAction(rdxActionTypes.PUZZLE_FAILED);

const puzzleCreated = createAction(rdxActionTypes.PUZZLE_CREATED, (data: TPuzzleData, puzzleDataDimension: number[], webSocket: WebSocket) => {
  return {
    payload: {
      data,
      puzzleDataDimension,
      webSocket
    }
  };
});

const puzzleUpdated = createAction<TPuzzleData | undefined>(rdxActionTypes.PUZZLE_UPDATED);

const puzzleGameOver = createAction(rdxActionTypes.PUZZLE_GAMEOVER);

const puzzleDecreaseValidationAttempt = createAction(rdxActionTypes.PUZZLE_VALIDATIONATTEMPTDECREASED);

const puzzleNextLevelAvailability = createAction<string | undefined>(rdxActionTypes.PUZZLE_NEXTLEVELAVAILABLE);

const puzzleNextLevelCreated = createAction(rdxActionTypes.PUZZLE_NEXTLEVELCREATED, (puzzleData: TPuzzleData, puzzleDataDimension: number[]) => {
  return {
    payload: {
      puzzleData,
      puzzleDataDimension
    }
  };
});


const rdxReturnToWelcomeAsync = (webSocket: WebSocket | undefined): IPuzzleDispatch => {
  return async (dispatch: Dispatch<IReduxActions>) => {
    try {
      if (webSocket) {
        const response = await new Socket().closeWebSocketAsync(webSocket);
        if (response !== null) {
          dispatch(puzzleReturned());
        } else {
          throw new Error();
        }
      } else {
        dispatch(puzzleReturned());
      }
    } catch (exception) {
      dispatch(puzzleFailed());
    }
  };
};

const rdxCreateWebSocketAndPuzzleAsync = (puzzleLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  dispatch(puzzleLoading());
  try {
    const response = await new Socket().createNewPuzzle(puzzleLevel);
    if (response instanceof Object) {
      dispatch(puzzleCreated(response.puzzleData, response.puzzleDataDimension, response.webSocket));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxrotatePuzzleCellAsync = ({ webSocket, cellX, cellY }: IRotatePuzzle): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  try {
    const puzzleData = await new Socket().rotatePuzzleCellAsync({ webSocket, cellX, cellY });
    if (puzzleData) {
      dispatch(puzzleUpdated(puzzleData));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxValidateExistingPuzzleAsync = (webSocket: WebSocket, puzzleLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  try {
    const validation = await new Socket().verifyPuzzleAsync(webSocket, puzzleLevel);

    // has an error
    if (!validation) {
      throw new Error();
    }

    // is not correct
    if (!validation.isCorrect) {
      dispatch(puzzleDecreaseValidationAttempt());
    }

    // is game over
    if (validation.isGameOver) {
      dispatch(puzzleGameOver());
    }

    // is correct
    if (validation.isCorrect) {
      dispatch(puzzleNextLevelAvailability(validation.levelPassword));
    }

  } catch (error) {
    dispatch(puzzleFailed());
  }
};

const rdxgoToNextLevelAsync = (webSocket: WebSocket, puzzleLevel: number): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  dispatch(puzzleLoading());
  try {
    const response = await new Socket().goToNextLevelAsync(webSocket, (puzzleLevel + 1));
    if (response) {
      dispatch(puzzleNextLevelCreated(response.puzzleData, response.puzzleDataDimension));
    } else {
      throw new Error();
    }
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};


export {
  rdxActionTypes,
  rdxReturnToWelcomeAsync,
  rdxCreateWebSocketAndPuzzleAsync,
  rdxrotatePuzzleCellAsync,
  rdxValidateExistingPuzzleAsync,
  rdxgoToNextLevelAsync,
  puzzleStarted,
  puzzleReturned,
  puzzleLoading,
  puzzleFailed,
  puzzleCreated,
  puzzleUpdated,
  puzzleDecreaseValidationAttempt,
  puzzleGameOver,
  puzzleNextLevelAvailability,
  puzzleNextLevelCreated
};
