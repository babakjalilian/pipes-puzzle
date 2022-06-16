import { getWebSocketReadyStateDesc } from '.';


describe('Enumeration getter function should be work as expected.', () => {
  describe('getWebSocketReadyStateDesc()', () => {
    it('"getWebSocketReadyStateDesc" function should return a correct string from mapWebSocketReadyState:', () => {
      const connectionReadyStateDescriptionExpectation1 = '(Socket has been created. The connection is not yet open.)';
      const connectionReadyStateDescription1: string = getWebSocketReadyStateDesc(0);
      expect(connectionReadyStateDescription1).toBe(connectionReadyStateDescriptionExpectation1);  
      const connectionReadyStateDescriptionExpectation2 = '(The connection is closed or couldn\'t be opened.)';
      const connectionReadyStateDescription2: string = getWebSocketReadyStateDesc(5);
      expect(connectionReadyStateDescription2).toBe(connectionReadyStateDescriptionExpectation2);  
      const connectionReadyStateDescriptionExpectation3 = '';
      const connectionReadyStateDescription3: string = getWebSocketReadyStateDesc();
      expect(connectionReadyStateDescription3).toBe(connectionReadyStateDescriptionExpectation3);
    });
  });
});