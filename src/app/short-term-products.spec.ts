import { ShortTermProducts } from './short-term-products';

describe('ShortTermProducts', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7); 
    
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7); 

    describe('Constructor', () => {
        it('should create a product with valid future date as Date object', () => {
            const product = new ShortTermProducts('Milk', 2.99, futureDate);
            expect(product).toBeInstanceOf(ShortTermProducts);
            expect(product.getExpireDate()).toEqual(futureDate);
        });

        it('should create a product with valid future date as string', () => {
            const product = new ShortTermProducts('Milk', 2.99, futureDate.toISOString());
            expect(product).toBeInstanceOf(ShortTermProducts);
            expect(product.getExpireDate()).toEqual(futureDate);
        });

        it('should throw error for expired product with past date as Date', () => {
            expect(() => new ShortTermProducts('Expired Milk', 1.99, pastDate))
                .toThrow('Product is spoiled');
        });

        it('should throw error for expired product with past date as string', () => {
            expect(() => new ShortTermProducts('Expired Milk', 1.99, pastDate.toISOString()))
                .toThrow('Product is spoiled');
        });
    });

    describe('getDetails', () => {
        it('should return correct details array', () => {
            const product = new ShortTermProducts('Yogurt', 3.49, futureDate);
            const details = product.getDetails();
            
            expect(details).toContain('Name:Yogurt');
            expect(details).toContain('Price: 3.49');
            expect(details).toContain(`Expire date: ${futureDate.toDateString()}`);
            expect(details.length).toBe(3);
        });
    });

    describe('getType', () => {
        it('should return correct product type', () => {
            const product = new ShortTermProducts('Cheese', 4.99, futureDate);
            expect(product.getType()).toBe('ShortTermProducts');
        });
    });

    describe('setExpireDate', () => {
        it('should update expire date with valid future date', () => {
            const product = new ShortTermProducts('Butter', 2.49, futureDate);
            const newDate = new Date(futureDate);
            newDate.setDate(newDate.getDate() + 1);
            
            product.setExpireDate(newDate);
            expect(product.getExpireDate()).toEqual(newDate);
        });

        it('should throw error when setting past date', () => {
            const product = new ShortTermProducts('Butter', 2.49, futureDate);
            
            expect(() => product.setExpireDate(pastDate))
                .toThrow('Product is spoiled');
        });
    });
});