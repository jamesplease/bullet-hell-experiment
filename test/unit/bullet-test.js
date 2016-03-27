import bulletTest from '../../src/bullet-test';

describe('bulletTest', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(bulletTest, 'greet');
      bulletTest.greet();
    });

    it('should have been run once', () => {
      expect(bulletTest.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(bulletTest.greet).to.have.always.returned('hello');
    });
  });
});
