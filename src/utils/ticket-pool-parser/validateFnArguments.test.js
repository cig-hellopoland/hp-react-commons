import validateFnArguments from './validateFnArguments';

describe('Ticket Pool Parser', () => {
  describe('validateFnArguments', () => {
    it('should throw if number of arguments is lower than expeted arguments amount', () => {
      expect(() => validateFnArguments(0, 1)).toThrow();
    });

    it('should do nothing if number of passed arguments is equal or greater than expected amount', () => {
      expect(() => validateFnArguments(1, 1)).not.toThrow();
    });
  });
});
