import { ValueObject } from './ValueObject';

class ConcreteValueObject extends ValueObject<{ prop1: string; prop2: number }> { }

describe('ValueObject', () => {
  describe('equals', () => {
    it('should return false if the compared object is null', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      expect(vo1.equals(null)).toBe(false);
    });

    it('should return false if the compared object is undefined', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      expect(vo1.equals(undefined)).toBe(false);
    });

    it('should return false if the compared object does not have props', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      const vo2 = new ConcreteValueObject(undefined);
      expect(vo1.equals(vo2)).toBe(false);
    });

    it('should return false if the props are different', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      const vo2 = new ConcreteValueObject({ prop1: 'value2', prop2: 200 });
      expect(vo1.equals(vo2)).toBe(false);
    });

    it('should return true if the props are the same', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      const vo2 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      expect(vo1.equals(vo2)).toBe(true);
    });

    it('should return false if the compared object has props as undefined', () => {
      const vo1 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });
      const vo2 = new ConcreteValueObject({ prop1: 'value1', prop2: 100 });

      Object.defineProperty(vo2, 'props', { value: undefined });

      expect(vo1.equals(vo2)).toBe(false);
    });
  });
});
