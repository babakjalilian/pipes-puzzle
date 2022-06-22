import { Dispatch } from 'redux';
import { TPuzzleData } from 'Services/Socket';



export interface IReduxState {
  puzzleIsWelcome: boolean;
  puzzleLevel: number;
  puzzleLevelPassword: string;
  puzzleIsStarted: boolean;
  puzzleIsOver: boolean;
  puzzleIsLoading: boolean;
  puzzleIsError: boolean;
  puzzleData?: TPuzzleData;
  puzzleDataDimension: number[];
  puzzleWebSocket?: WebSocket;
  puzzleRemainingValidationAttempt: number;
  puzzleIsNextLevelAvailable: boolean;
  puzzleVerifyEnable: boolean;
  puzzleReducer?: any;
}

export interface IReduxActionTypes {
  PUZZLE_STARTED: string;
  PUZZLE_RETURNED: string;
  PUZZLE_LOADING: string;
  PUZZLE_FAILED: string;
  PUZZLE_CREATED: string;
  PUZZLE_UPDATED: string;
  PUZZLE_GAMEOVER: string;
  PUZZLE_VALIDATIONATTEMPTDECREASED: string;
  PUZZLE_VERIFYENABLED: string;
  PUZZLE_NEXTLEVELAVAILABLE: string;
  PUZZLE_NEXTLEVELCREATED: string;
}

export interface IReduxActions {
  type: string;
  actionGameLevel?: number;
  actionGamePassword?: string;
  actionData?: TPuzzleData;
  actionWebSocket?: WebSocket;
}

export interface IPuzzleDispatch {
  (dispatch: Dispatch<IReduxActions>): Promise<void>;
}

export type {
  Dispatch,
};
