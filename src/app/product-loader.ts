import { IProduct } from "./iproduct";
import { ProductFactory } from "./product-factory";

export class ProductLoader {
    static async loadProductsFromUrl(url: string): Promise<IProduct[]> {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const jsonData = await response.json();
            
            const productsData = jsonData.record || jsonData;
            
            if (!Array.isArray(productsData)) {
                throw new Error("Loaded data is not an array");
            }
            
            const products: IProduct[] = [];
            for (const productData of productsData) {
                try {
                    const product = ProductFactory.createProduct(productData);
                    products.push(product);
                } catch (error) {
                    console.error(`Error creating product from data: ${JSON.stringify(productData)}`, error);
                }
            }
            
            return products;
        } catch (error) {
            console.error("Error loading products:", error);
            throw error;
        }
    }
}