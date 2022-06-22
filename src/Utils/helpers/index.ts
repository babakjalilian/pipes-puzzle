import { TPuzzleData } from 'Services/Socket';

const createPuzzleDataFromMessage = (message: string): TPuzzleData => {
  return message.replace('map:', '')?.trim().split('\n').map((x: string) => x?.trim().split(''));
};

const getStorageItem = (key: string): string | null => {
  return window.localStorage.getItem(key) || null;
};

const setStorageItem = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

const rotateCell = (shape: string): string => {
  switch (shape) {
  case '┗':
    return '┏';
  case '┏':
    return '┓';
  case '┓':
    return '┛';
  case '┛':
    return '┗';
  case '┃':
    return '━';
  case '━':
    return '┃';
  case '┳':
    return '┫';
  case '┫':
    return '┻';
  case '┻':
    return '┣';
  case '┣':
    return '┳';
  case '╹':
    return '╺';
  case '╺':
    return '╻';
  case '╻':
    return '╸';
  case '╸':
    return '╹';
  case '╋':
    return '╋';
  default:
    return '╋';
  }
};

const updateRotationQueue=(rotationCoordinate:string,rotationQueue:{ [key: string]: string; }) : { [key: string]: string; }=>{
  if(rotationQueue[rotationCoordinate]) {
    rotationQueue[rotationCoordinate] = rotationQueue[rotationCoordinate].concat(`\n${rotationCoordinate}`);
  } else {
    rotationQueue[rotationCoordinate]=`\n${rotationCoordinate}`;
  }

  const numberOfRotations=rotationQueue[rotationCoordinate].trim().split('\n').length;
  if(numberOfRotations===4) {
    delete rotationQueue[rotationCoordinate];
  }
  return rotationQueue;
};

export {
  createPuzzleDataFromMessage,
  getStorageItem,
  setStorageItem,
  rotateCell,
  updateRotationQueue
};

