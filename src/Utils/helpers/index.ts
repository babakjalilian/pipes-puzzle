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

export {
  createPuzzleDataFromMessage,
  getStorageItem,
  setStorageItem,
};
