interface IConstants {
  api: {
    defaultWebSocketUrl: string;
    requestHelp: string;
    requestNew: string;
    requestMap: string;
    requestRotate: string;
    requestVerify: string;
    responseNewSuccess: string;
    responseRotateSuccess: string;
    responseMapSuccess: string;
    responseVerifyIsCorrect: string;
    responsePassword: string;
    responseGameOver: string;
    remainingVerifyAttemptCount: number;
    maxLevel: number;
  };
  localStorageKeyPrefix: string;
  localStorageKeys: {
    levelPassword1: string;
    levelPassword2: string;
    levelPassword3: string;
    levelPassword4: string;
    levelPassword5: string;
    levelPassword6: string;
  };
}

const constants: IConstants = {
  api: {
    defaultWebSocketUrl: 'wss://hometask.eg1236.com/game-pipes/',
    requestHelp: 'help', // help - lists other commands
    requestNew: 'new', // new <l> - chooses the game level, <1|6>
    requestMap: 'map', // map - returns the current map
    requestRotate: 'rotate', // rotate <x> <y> - rotates the tile at coordinates
    requestVerify: 'verify', // verify - verifies if the current solution is a valid one (if yes, it will return a level password).
    responseNewSuccess: 'new: OK',
    responseRotateSuccess: 'rotate: OK',
    responseMapSuccess: 'map:',
    responseVerifyIsCorrect: 'verify: Correct!',
    responsePassword: 'Password:',
    responseGameOver: 'verify: Only 10',
    remainingVerifyAttemptCount: 12,
    maxLevel: 6,
  },
  localStorageKeyPrefix: 'puzzle-password-level_',
  localStorageKeys: {
    levelPassword1: 'puzzle-password-level_1',
    levelPassword2: 'puzzle-password-level_2',
    levelPassword3: 'puzzle-password-level_3',
    levelPassword4: 'puzzle-password-level_4',
    levelPassword5: 'puzzle-password-level_5',
    levelPassword6: 'puzzle-password-level_6',
  },
};
const messages = {
  app: {
    title: 'Pipes Puzzle',
  },
  text: {
    levelPrefix: 'Level',
    check: 'Check',
    giveUp: 'Give Up!',
    return: 'Return',
    nextLevel: 'Next Level',
    loading: 'Please wait...',
    connectionError: 'Something went wrong. Please try again.',
    remainingVerifyAttemptText: "You don't have unlimited check opportunities, only",
    achievemessage: 'Well done! You now have the password for this level:',
    gameOverMessage: 'Game over! Try again.',
    gameFinishedMessage: 'We never thought anyone would see this! You made the impossible possible! ',
    welcomeTitle: 'Welcome!',
    welcomeDescription: 'The goal of the puzzle is to rotate the tiles on the map to make all pipes connected in a single group, with no loops and no dangling pipes. Click a tile with the mouse to rotate it.\n Choose a level to start.',
    copyright: 'All rights reservedd.',
  },
  levelDescriptions: {
    level_1: '(8x8) A Cute Welcome',
    level_2: '(20x25) Warming You Up',
    level_3: "(50x50) Let's Do This!",
    level_4: '(100x200) Getting Serious!',
    level_5: '(300x400) Standing Ovation for the Pro!',
    level_6: '(1000x1000) Take This Monster Down, Champ.',
  },
};

export type { IConstants };
export { constants, messages };

