import { Drinks } from './drinks';
import { Product } from './product';

describe('Drinks Class', () => {
  let alcoholicDrink: Drinks;
  let nonAlcoholicDrink: Drinks;

  beforeEach(() => {
    alcoholicDrink = new Drinks('Beer', 3.50, 500, true);
    nonAlcoholicDrink = new Drinks('Soda', 2.00, 330, false);
  });

  it('should be an instance of Product', () => {
    expect(alcoholicDrink).toBeInstanceOf(Product);
  });

  describe('Constructor', () => {
    it('should create an alcoholic drink with correct properties', () => {
      expect(alcoholicDrink.getName()).toBe('Beer');
      expect(alcoholicDrink.getPrice()).toBe(3.50);
      expect(alcoholicDrink.getVolume()).toBe(500);
      expect(alcoholicDrink.isAlcohol()).toBe(true);
    });

    it('should create a non-alcoholic drink with correct properties', () => {
      expect(nonAlcoholicDrink.getName()).toBe('Soda');
      expect(nonAlcoholicDrink.getPrice()).toBe(2.00);
      expect(nonAlcoholicDrink.getVolume()).toBe(330);
      expect(nonAlcoholicDrink.isAlcohol()).toBe(false);
    });

    it('should throw an error for negative volume', () => {
      expect(() => new Drinks('Water', 1.00, -100, false))
        .toThrow(new Error('Volume must be positive'));
    });

    it('should accept zero volume (edge case)', () => {
      const emptyDrink = new Drinks('Empty Can', 0.50, 0, false);
      expect(emptyDrink.getVolume()).toBe(0);
    });
  });

  describe('isAlcohol()', () => {
    it('should return true for alcoholic drinks', () => {
      expect(alcoholicDrink.isAlcohol()).toBe(true);
    });

    it('should return false for non-alcoholic drinks', () => {
      expect(nonAlcoholicDrink.isAlcohol()).toBe(false);
    });
  });

  describe('getVolume()', () => {
    it('should return the correct volume', () => {
      expect(alcoholicDrink.getVolume()).toBe(500);
      expect(nonAlcoholicDrink.getVolume()).toBe(330);
    });
  });

  describe('getDetails()', () => {
    it('should return an array with 4 details', () => {
      const details = alcoholicDrink.getDetails();
      expect(details.length).toBe(4);
    });

    it('should include name in details', () => {
      const details = alcoholicDrink.getDetails();
      expect(details).toContain('Name:Beer');
    });

    it('should include price in details', () => {
      const details = alcoholicDrink.getDetails();
      expect(details).toContain('Price: 3.5');
    });

    it('should include volume in details', () => {
      const details = alcoholicDrink.getDetails();
      expect(details).toContain('Volume: 500');
    });

    it('should include alcohol status in details', () => {
      const alcoholicDetails = alcoholicDrink.getDetails();
      expect(alcoholicDetails).toContain('Is alcohol? true');
      
      const nonAlcoholicDetails = nonAlcoholicDrink.getDetails();
      expect(nonAlcoholicDetails).toContain('Is alcohol? false');
    });
  });

  describe('getType()', () => {
    it('should return "Drinks" as type', () => {
      expect(alcoholicDrink.getType()).toBe('Drinks');
      expect(nonAlcoholicDrink.getType()).toBe('Drinks');
    });
  });

  describe('Inherited Methods', () => {
    it('should have getName() from Product', () => {
      expect(alcoholicDrink.getName()).toBe('Beer');
    });

    it('should have getPrice() from Product', () => {
      expect(alcoholicDrink.getPrice()).toBe(3.50);
    });
  });
});