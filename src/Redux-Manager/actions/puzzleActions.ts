import { createAction } from '@reduxjs/toolkit';
import { Dispatch, IPuzzleDispatch, IReduxActions, IReduxActionTypes } from 'Redux-Manager/interfaces/puzzle.Interface';
import { IRotatePuzzle, Socket, TPuzzleData } from 'Services/Socket';
import { constants } from 'Utils/constants';



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

const puzzleUpdated = createAction(rdxActionTypes.PUZZLE_UPDATED,(cellY:number, cellX:number)=>{
  return {
    payload: {
      cellY,
      cellX
    }
  };
});

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

const rdxRotatePuzzleCellOnClient = ({ cellX, cellY }: IRotatePuzzle): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  try {
    dispatch(puzzleUpdated(cellY, cellX));
  } catch (exception) {
    dispatch(puzzleFailed());
  }
};

const rdxRotatePuzzleCellsOnServer = (puzzleWebSocket:WebSocket,rotations:{[key:string]:string}): IPuzzleDispatch => async (dispatch: Dispatch<IReduxActions>) => {
  const rotationQueue = Object.values(rotations).join('');
  const numberOfRotations= rotationQueue.trim().split(' ').length / 2;
  if(numberOfRotations === constants.api.syncRotationsWithServerLimit){
    const response = await new Socket().rotatePuzzleCellsOnServer(puzzleWebSocket,rotationQueue);
    if (response === null) {
      dispatch(puzzleFailed());
    } 
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
  rdxRotatePuzzleCellOnClient,
  rdxRotatePuzzleCellsOnServer,
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

