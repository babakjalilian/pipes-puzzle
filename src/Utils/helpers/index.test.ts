import { TPuzzleData } from 'Services/Socket';
import { createPuzzleDataFromMessage } from '.';


describe('Helper functions should be work as expected.', () => {

  describe('createPuzzleDataFromMessage()', () => {
    it('"createPuzzleDataFromMessage" function should return a two-dimensional Array of Strings:', () => {

      const pattern1 = 'map:\nabcd\nefgh\nijkl\nmnop\nqrst\nuvwx\nyzab\ncdef\n';
      const twoDimensionalArrayOfString1: TPuzzleData = createPuzzleDataFromMessage(pattern1);
      const stringify1Pattern = JSON.stringify(twoDimensionalArrayOfString1);
      const stringify1Expectation = JSON.stringify([['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p'], ['q', 'r', 's', 't'], ['u', 'v', 'w', 'x'], ['y', 'z', 'a', 'b'], ['c', 'd', 'e', 'f']]);
      expect(stringify1Pattern).toBe(stringify1Expectation);

      const pattern2 = 'map:\n┛┻━┣━╺┛╸\n╻╹┛┳┣┃┳┏\n╹╸╻╹━╻╺┃\n┗╋╹┫╋┻━╻\n┓┳┗┃┃╺┣╻\n╺┏┻━━┏┛╺\n╻┣┏┏┗╋┗┃\n╻┗╸┃┃┗┗┗\n';
      const twoDimensionalArrayOfString2: TPuzzleData = createPuzzleDataFromMessage(pattern2);
      const stringify2Pattern = JSON.stringify(twoDimensionalArrayOfString2);
      const stringify2Expectation = JSON.stringify([['┛', '┻', '━', '┣', '━', '╺', '┛', '╸'], ['╻', '╹', '┛', '┳', '┣', '┃', '┳', '┏'], ['╹', '╸', '╻', '╹', '━', '╻', '╺', '┃'], ['┗', '╋', '╹', '┫', '╋', '┻', '━', '╻'], ['┓', '┳', '┗', '┃', '┃', '╺', '┣', '╻'], ['╺', '┏', '┻', '━', '━', '┏', '┛', '╺'], ['╻', '┣', '┏', '┏', '┗', '╋', '┗', '┃'], ['╻', '┗', '╸', '┃', '┃', '┗', '┗', '┗']]);
      expect(stringify2Pattern).toBe(stringify2Expectation);

    });
  });
});
