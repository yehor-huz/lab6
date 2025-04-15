import { ProductLoader } from './product-loader';
import { MilkProducts } from './milk-products';
import { Vegetables } from './vegetables';
import { Drinks } from './drinks';

describe('ProductLoader', () => {
  beforeEach(() => {
    spyOn(window, 'fetch');
  });

  function mockFetchResponse(data: any, ok = true, status = 200) {
    const mockResponse: Partial<Response> = {
      ok,
      status,
      json: () => Promise.resolve(data),
    };
  
    (window.fetch as jasmine.Spy).and.returnValue(Promise.resolve(mockResponse as Response));
  }
  

  it('should load MilkProducts, Vegetables and Drinks', async () => {
    const mockData = [
      { type: 'MilkProducts', name: 'Milk', price: 10, fat: 3.5 },
      { type: 'Vegetables', name: 'Carrot', price: 5, weight: 0.5 },
      { type: 'Drinks', name: 'Juice', price: 8, volume: 1, alcohol: false }
    ];

    mockFetchResponse(mockData);

    const products = await ProductLoader.loadProductsFromUrl('https://example.com/products');

    expect(products.length).toBe(3);
    expect(products[0] instanceof MilkProducts).toBeTrue();
    expect(products[1] instanceof Vegetables).toBeTrue();
    expect(products[2] instanceof Drinks).toBeTrue();
    expect(products[2].getName()).toBe('Juice');
  });

  it('should throw an error for bad response', async () => {
    (window.fetch as jasmine.Spy).and.returnValue(Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    } as Response));

    try {
      await ProductLoader.loadProductsFromUrl('https://test.com/products');
      fail('Expected error not thrown');
    } catch (error) {
      expect((error as Error).message).toContain('HTTP error! status: 404');
    }
  });

  it('should throw error for non-array JSON', async () => {
    mockFetchResponse({ foo: 'bar' });

    try {
      await ProductLoader.loadProductsFromUrl('https://test.com/products');
      fail('Expected error not thrown');
    } catch (error) {
      expect((error as Error).message).toContain('Loaded data is not an array');
    }
  });

  it('should skip unknown product types', async () => {
    spyOn(console, 'error');

    const mockData = [
      { type: 'UnknownType', name: 'Mystery' }
    ];

    mockFetchResponse(mockData);

    const products = await ProductLoader.loadProductsFromUrl('https://example.com/products');

    expect(products.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      jasmine.stringMatching(/Error creating product from data/),
      jasmine.any(Error)
    );
  });

  it('should handle data in record field', async () => {
    const mockRecord = [
      { type: 'MilkProducts', name: 'Kefir', price: 12, fat: 1.5 }
    ];

    mockFetchResponse({ record: mockRecord });

    const products = await ProductLoader.loadProductsFromUrl('https://example.com/products');

    expect(products.length).toBe(1);
    expect(products[0] instanceof MilkProducts).toBeTrue();
    expect(products[0].getName()).toBe('Kefir');
  });
});
