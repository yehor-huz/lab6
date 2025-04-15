import { Vegetables } from './vegetables';
import { Product } from './product';

describe('Vegetables Class', () => {
  let vegetable: Vegetables;

  beforeEach(() => {
    vegetable = new Vegetables('Carrot', 1.99, 0.5);
  });

  it('should be an instance of Product', () => {
    expect(vegetable).toBeInstanceOf(Product);
  });

  describe('Constructor', () => {
    it('should create a vegetable with correct properties', () => {
      expect(vegetable.getName()).toBe('Carrot');
      expect(vegetable.getPrice()).toBe(1.99);
      expect(vegetable.getWeight()).toBe(0.5);
    });

    it('should throw an error for negative weight', () => {
      expect(() => new Vegetables('Tomato', 2.99, -0.1)).toThrow(new Error('Weight must be positive'));
    });
  });

  describe('getWeight()', () => {
    it('should return the correct weight', () => {
      expect(vegetable.getWeight()).toBe(0.5);
    });
  });

  describe('getDetails()', () => {
    it('should return an array of details', () => {
      const details = vegetable.getDetails();
      expect(Array.isArray(details)).toBe(true);
      expect(details.length).toBe(3);
    });

    it('should include name in details', () => {
      const details = vegetable.getDetails();
      expect(details).toContain('Name:Carrot');
    });

    it('should include price in details', () => {
      const details = vegetable.getDetails();
      expect(details).toContain('Price: 1.99');
    });

    it('should include weight in details', () => {
      const details = vegetable.getDetails();
      expect(details).toContain('Weight: 0.5');
    });
  });

  describe('getType()', () => {
    it('should return "Vegetables" as type', () => {
      expect(vegetable.getType()).toBe('Vegetables');
    });
  });

  describe('Inherited Methods', () => {
    it('should have getName() from Product', () => {
      expect(vegetable.getName()).toBe('Carrot');
    });

    it('should have getPrice() from Product', () => {
      expect(vegetable.getPrice()).toBe(1.99);
    });
  });
});