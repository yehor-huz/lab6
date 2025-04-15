import { MilkProducts } from './milk-products';
import { Product } from './product';

describe('MilkProducts Class', () => {
  let milkProduct: MilkProducts;

  beforeEach(() => {
    milkProduct = new MilkProducts('Whole Milk', 2.49, 3.5);
  });

  it('should be an instance of Product', () => {
    expect(milkProduct).toBeInstanceOf(Product);
  });

  describe('Constructor', () => {
    it('should create a milk product with correct properties', () => {
      expect(milkProduct.getName()).toBe('Whole Milk');
      expect(milkProduct.getPrice()).toBe(2.49);
      expect(milkProduct.getFat()).toBe(3.5);
    });

    it('should throw an error for negative fat percentage', () => {
      expect(() => new MilkProducts('Skim Milk', 1.99, -1)).toThrow('Fat must be between 0% and 85%');
    });

    it('should throw an error for fat percentage above 85%', () => {
      expect(() => new MilkProducts('Cream', 4.99, 86)).toThrow('Fat must be between 0% and 85%');
    });

    it('should accept minimum fat percentage (0%)', () => {
      const skimMilk = new MilkProducts('Skim Milk', 1.99, 0);
      expect(skimMilk.getFat()).toBe(0);
    });

    it('should accept maximum fat percentage (85%)', () => {
      const heavyCream = new MilkProducts('Heavy Cream', 5.99, 85);
      expect(heavyCream.getFat()).toBe(85);
    });
  });

  describe('getFat()', () => {
    it('should return the correct fat percentage', () => {
      expect(milkProduct.getFat()).toBe(3.5);
    });
  });

  describe('getDetails()', () => {
    it('should return an array of details', () => {
      const details = milkProduct.getDetails();
      expect(Array.isArray(details)).toBe(true);
      expect(details.length).toBe(3);
    });

    it('should include name in details', () => {
      const details = milkProduct.getDetails();
      expect(details).toContain('Name:Whole Milk');
    });

    it('should include price in details', () => {
      const details = milkProduct.getDetails();
      expect(details).toContain('Price: 2.49');
    });

    it('should include fat percentage in details with % symbol', () => {
      const details = milkProduct.getDetails();
      expect(details).toContain('Fat: 3.5%');
    });
  });

  describe('getType()', () => {
    it('should return "MilkProducts" as type', () => {
      expect(milkProduct.getType()).toBe('MilkProducts');
    });
  });

  describe('Inherited Methods', () => {
    it('should have getName() from Product', () => {
      expect(milkProduct.getName()).toBe('Whole Milk');
    });

    it('should have getPrice() from Product', () => {
      expect(milkProduct.getPrice()).toBe(2.49);
    });
  });
});