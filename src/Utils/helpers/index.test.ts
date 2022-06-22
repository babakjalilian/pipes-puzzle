import { TPuzzleData } from 'Services/Socket';
import { rotateCell, updateRotationQueue } from 'Utils/helpers';
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
  describe('rotateCell()', () => {
    it('"rotateCell" function should return a 90 degree rotated shape as a String:', () => {

      let shapeList = ['┗','┏','┓','┛','━','┃','┫','┻','┣','┳','╺','╻','╸','╹','╋']


      shapeList=shapeList.map(shape=>rotateCell(shape));
      
      const rotatedShapeList=JSON.stringify(shapeList);

      const rotatedShapeListExpectation = JSON.stringify(['┏','┓','┛','┗','┃','━','┻','┣','┳','┫','╻','╸','╹','╺','╋']);
      
      expect(rotatedShapeList).toBe(rotatedShapeListExpectation);

    });
  });

  describe('updateRotationQueue()', () => {
    it('"rotateCell" function should return a 90 degree rotated shape as a String:', () => {

      let rotationCoordinate1='0 0';
      let rotationQueue1={'0 0': '\n0 0'};
      updateRotationQueue(rotationCoordinate1, rotationQueue1);
      let rotatioQueue1Pattern=JSON.stringify(rotationQueue1);
      let rotationQueue1Expectation=JSON.stringify({'0 0': '\n0 0\n0 0'});
      expect(rotatioQueue1Pattern).toBe(rotationQueue1Expectation);
      
      let rotationCoordinate2='1 1';
      let rotationQueue2={'0 0': '\n0 0'};
      updateRotationQueue(rotationCoordinate2, rotationQueue2);
      let rotatioQueue2Pattern=JSON.stringify(rotationQueue2);
      let rotationQueue2Expectation=JSON.stringify({'0 0': '\n0 0', '1 1':'\n1 1'});
      expect(rotatioQueue2Pattern).toBe(rotationQueue2Expectation);
      
      let rotationCoordinate3='0 0';
      let rotationQueue3={'0 0': '\n0 0\n0 0\n0 0', '1 1':'\n1 1'};
      updateRotationQueue(rotationCoordinate3, rotationQueue3);
      let rotatioQueue3Pattern=JSON.stringify(rotationQueue3);
      let rotationQueue3Expectation=JSON.stringify({'1 1':'\n1 1'});
      expect(rotatioQueue3Pattern).toBe(rotationQueue3Expectation);
      

    });
  });
});
