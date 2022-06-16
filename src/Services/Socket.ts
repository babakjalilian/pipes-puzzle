import { constants } from 'Utils/constants';
import { createPuzzleDataFromMessage, setStorageItem } from 'Utils/helpers';

type TPuzzleData = string[][];

interface ICreateNewSocketAndPuzzle {
  puzzleData: TPuzzleData;
  puzzleDataDimension: number[];
  webSocket: WebSocket;
}

interface IRotatePuzzle {
  webSocket: WebSocket;
  cellX: number;
  cellY: number;
}

interface IVerifyPuzzle {
  isCorrect: boolean;
  isGameOver: boolean;
  levelPassword: string;
}

class Socket {

  private static instance: Socket;
  constructor(webSocketUrl?: string) {
    this._webSocketUrl = webSocketUrl || this._webSocketUrl;
    if (!Socket.instance) {
      Socket.instance = this;
    }
    return Socket.instance;
  }
  private _webSocketUrl: string = constants.api.defaultWebSocketUrl;

  private onOpenConnectionAsync = async (webSocket: WebSocket): Promise<boolean> => new Promise((resolve) => {
    webSocket.onopen = () => {
      resolve(true);
    };
    webSocket.onerror = () => {
      resolve(false);
    };
  });

  private onRecieveMessageAsync = async (webSocket: WebSocket): Promise<string | null> => new Promise((resolve) => {
    webSocket.onmessage = (event: MessageEvent) => {
      const message = event.data || '';
      resolve(message);
    };
    webSocket.onerror = () => {
      resolve(null);
    };
  });

  private onCloseConnectionAsync = async (webSocket: WebSocket): Promise<number | null> => new Promise((resolve) => {
    webSocket.onclose = () => {
      resolve(webSocket.readyState);
    };
    webSocket.onerror = () => {
      resolve(null);
    };
  });

  createNewPuzzle = async (puzzleLevel: number): Promise<ICreateNewSocketAndPuzzle | null> => {
    try {

      const webSocket = new WebSocket(this._webSocketUrl);
      const isConnectionStarted = await this.onOpenConnectionAsync(webSocket);
      if (!isConnectionStarted) {
        throw new Error();
      }

      webSocket.send(`${constants.api.requestNew} ${puzzleLevel}`);
      const newResponse = await this.onRecieveMessageAsync(webSocket);
      if (!newResponse?.startsWith(constants.api.responseNewSuccess)) {
        throw new Error();
      }

      webSocket.send(constants.api.requestMap);
      const mapResponse = await this.onRecieveMessageAsync(webSocket);
      if (!mapResponse?.startsWith(constants.api.responseMapSuccess)) {
        throw new Error();
      }

      const puzzleData = createPuzzleDataFromMessage(mapResponse);
      const puzzleDataDimension = [puzzleData.length, puzzleData[0].length];
      return {
        puzzleData,
        puzzleDataDimension,
        webSocket,
      };
    } catch (error) {
      return null;
    }
  };

  rotatePuzzleCellAsync = async ({ webSocket, cellX, cellY }: IRotatePuzzle): Promise<TPuzzleData | null> => {
    try {
      webSocket.send(`${constants.api.requestRotate} ${cellX} ${cellY}`);
      let response = await this.onRecieveMessageAsync(webSocket);
      while (!response?.startsWith(constants.api.responseRotateSuccess)) {
        response = await this.onRecieveMessageAsync(webSocket);
      }

      webSocket.send(constants.api.requestMap);
      let rotateIsMap = await this.onRecieveMessageAsync(webSocket);
      while (!rotateIsMap?.startsWith(constants.api.responseMapSuccess)) {
        rotateIsMap = await this.onRecieveMessageAsync(webSocket);
      }

      const puzzleData = createPuzzleDataFromMessage(rotateIsMap);
      return puzzleData;

    } catch (error) {
      return null;
    }
  };

  verifyPuzzleAsync = async (webSocket: WebSocket, puzzleLevel: number): Promise<IVerifyPuzzle | null> => {
    try {
      webSocket.send(constants.api.requestVerify);
      const isVerified = await this.onRecieveMessageAsync(webSocket);

      // is has an error, etc...
      if (!isVerified) {
        throw new Error();
      }

      // base response, also this is for "incorrect"
      let response: IVerifyPuzzle = {
        isCorrect: false,
        isGameOver: false,
        levelPassword: '',
      };

      // puzzle is over attempt
      if (isVerified?.startsWith(constants.api.responseGameOver)) {
        response = {
          isCorrect: false,
          isGameOver: true,
          levelPassword: '',
        };
      }

      // puzzle is verified
      if (isVerified?.startsWith(constants.api.responseVerifyIsCorrect)) {
        const password = isVerified.split(constants.api.responsePassword).pop()?.trim() || '';
        setStorageItem(`${constants.localStorageKeyPrefix}${puzzleLevel}`, password);

        response = {
          isCorrect: true,
          isGameOver: false,
          levelPassword: password,
        };
      }

      return response;

    } catch (error) {
      return null;
    }
  };

  goToNextLevelAsync = async (webSocket: WebSocket, nextLevel: number): Promise<{ puzzleData: TPuzzleData, puzzleDataDimension: number[] } | null> => {
    try {

      const nextAvailableLevel = nextLevel > constants.api.maxLevel ? constants.api.maxLevel : nextLevel;

      webSocket.send(`${constants.api.requestNew} ${nextAvailableLevel}`);
      const newResponse = await this.onRecieveMessageAsync(webSocket);
      if (!newResponse?.startsWith(constants.api.responseNewSuccess)) {
        throw new Error();
      }

      webSocket.send(constants.api.requestMap);
      const mapResponse = await this.onRecieveMessageAsync(webSocket);
      if (!mapResponse?.startsWith(constants.api.responseMapSuccess)) {
        throw new Error();
      }

      const puzzleData = createPuzzleDataFromMessage(mapResponse);
      const puzzleDataDimension = [puzzleData.length, puzzleData[0].length];
      return {
        puzzleData,
        puzzleDataDimension
      };
    } catch (error) {
      return null;
    }
  };

  closeWebSocketAsync = async (webSocket: WebSocket): Promise<number | null> => {
    try {
      webSocket.close();
      const response = await this.onCloseConnectionAsync(webSocket);
      if (response !== null) {
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      return null;
    }
  };
}

export type {
  TPuzzleData,
  ICreateNewSocketAndPuzzle,
  IRotatePuzzle,
};

export { Socket };
