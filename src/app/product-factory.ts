import { Drinks } from "./drinks";
import { IProduct } from "./iproduct";
import { MilkProducts } from "./milk-products";
import { productType } from "./product-type";
import { ShortTermProducts } from "./short-term-products";
import { Vegetables } from "./vegetables";

export class ProductFactory {
    static createProduct(data: any): IProduct {
        switch(data.type) {
            case productType[0]:
                return new MilkProducts(data.name, data.price, data.fat);
            case productType[1]:
                return new Vegetables(data.name, data.price, data.weight);
            case productType[2]:
                return new Drinks(data.name, data.price, data.volume, data.alcohol);
            case productType[3]:
                return new ShortTermProducts(data.name, data.price, data.date);
            default:
                throw new Error("Unknown type " + data.type);
        }
    }
}
