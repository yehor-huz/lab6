import { ProductFactory } from './product-factory';
import { MilkProducts } from './milk-products';
import { Vegetables } from './vegetables';
import { Drinks } from './drinks';
import { productType } from './product-type';

describe('ProductFactory', () => {
  describe('createProduct', () => {
    it('should create a MilkProducts instance when type is MilkProducts', () => {
      const milkProductData = {
        type: productType[0], 
        name: 'Whole Milk',
        price: 2.49,
        fat: 3.5
      };

      const product = ProductFactory.createProduct(milkProductData);
      expect(product).toBeInstanceOf(MilkProducts);
      expect(product.getName()).toBe('Whole Milk');
      expect(product.getPrice()).toBe(2.49);
      expect((product as MilkProducts).getFat()).toBe(3.5);
    });

    it('should create a Vegetables instance when type is Vegetables', () => {
      const vegetableData = {
        type: productType[1], 
        name: 'Carrot',
        price: 1.99,
        weight: 0.5
      };

      const product = ProductFactory.createProduct(vegetableData);
      expect(product).toBeInstanceOf(Vegetables);
      expect(product.getName()).toBe('Carrot');
      expect(product.getPrice()).toBe(1.99);
      expect((product as Vegetables).getWeight()).toBe(0.5);
    });

    it('should create a Drinks instance when type is Drinks', () => {
      const drinkData = {
        type: productType[2], 
        name: 'Beer',
        price: 3.50,
        volume: 500,
        alcohol: true
      };

      const product = ProductFactory.createProduct(drinkData);
      expect(product).toBeInstanceOf(Drinks);
      expect(product.getName()).toBe('Beer');
      expect(product.getPrice()).toBe(3.50);
      expect((product as Drinks).getVolume()).toBe(500);
      expect((product as Drinks).isAlcohol()).toBe(true);
    });

    it('should throw an error for unknown product type', () => {
      const unknownData = {
        type: 'UnknownType',
        name: 'Test',
        price: 1.00
      };

      expect(() => ProductFactory.createProduct(unknownData))
        .toThrow(new Error('Unknown type UnknownType'));
    });
  });
});