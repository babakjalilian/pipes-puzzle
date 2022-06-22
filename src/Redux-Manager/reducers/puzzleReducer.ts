import { createReducer } from '@reduxjs/toolkit';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';
import { constants } from 'Utils/constants';
import { rotateCell } from 'Utils/helpers';
import { puzzleCreated, puzzleDecreaseValidationAttempt, puzzleFailed, puzzleGameOver, puzzleLoading, puzzleNextLevelAvailability, puzzleNextLevelCreated, puzzleReturned, puzzleStarted, puzzleUpdated } from '../actions/puzzleActions';



const puzzleInitialState: IReduxState = {
  puzzleIsWelcome: true,
  puzzleLevel: 1,
  puzzleLevelPassword: '',
  puzzleIsStarted: false,
  puzzleIsOver: false,
  puzzleIsLoading: false,
  puzzleIsError: false,
  puzzleData: [],
  puzzleDataDimension: [0, 0],
  puzzleWebSocket: undefined,
  puzzleRemainingValidationAttempt: constants.api.remainingVerifyAttemptCount,
  puzzleIsNextLevelAvailable: false,
};

const puzzleReducer = createReducer(puzzleInitialState, (builder) => {
  builder
    .addCase(puzzleStarted, (state, action) => {
      state.puzzleIsWelcome = false;
      state.puzzleLevel = (action.payload || puzzleInitialState.puzzleLevel);
    })
    .addCase(puzzleReturned, () => puzzleInitialState)
    .addCase(puzzleLoading, (state,) => {
      state.puzzleIsLoading = true;
      state.puzzleIsError = false;
    })
    .addCase(puzzleFailed, (state,) => {
      state.puzzleIsLoading = false;
      state.puzzleIsError = true;
    })
    .addCase(puzzleCreated, (state, action) => {
      state.puzzleIsStarted = true;
      state.puzzleIsLoading = false;
      state.puzzleIsError = false;
      state.puzzleData = action.payload.data;
      state.puzzleDataDimension = action.payload.puzzleDataDimension;
      state.puzzleWebSocket = action.payload.webSocket;
    })
    .addCase(puzzleUpdated, (state, action) => {
      if(state.puzzleData){
        state.puzzleData[action.payload.cellY][action.payload.cellX] = rotateCell(state.puzzleData[action.payload.cellY][action.payload.cellX]);
      }
    })
    .addCase(puzzleDecreaseValidationAttempt, (state,) => {
      state.puzzleRemainingValidationAttempt = (state.puzzleRemainingValidationAttempt - 1);
    })
    .addCase(puzzleGameOver, (state,) => {
      state.puzzleIsOver = true;
    })
    .addCase(puzzleNextLevelAvailability, (state, action) => {
      state.puzzleIsNextLevelAvailable = true;
      state.puzzleLevelPassword = (action.payload || '');
    })
    .addCase(puzzleNextLevelCreated, (state, action) => {
      state.puzzleIsWelcome = false;
      state.puzzleIsStarted = true;
      state.puzzleIsLoading = false;
      state.puzzleIsNextLevelAvailable = false;
      state.puzzleLevel = (state.puzzleLevel + 1);
      state.puzzleData = action.payload.puzzleData;
      state.puzzleDataDimension = action.payload.puzzleDataDimension;
      state.puzzleRemainingValidationAttempt = puzzleInitialState.puzzleRemainingValidationAttempt;
    });
});

export {
  puzzleInitialState,
  puzzleReducer,
};
