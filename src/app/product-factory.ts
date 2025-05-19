import { Drinks } from "./drinks";
import { IProduct } from "./iproduct";
import { MilkProducts } from "./milk-products";
import { productType } from "./product-type";
import { ShortTermProducts } from "./short-term-products";
import { Vegetables } from "./vegetables";

export class ProductFactory {
    static createProduct(data: any): IProduct {
        console.log("data");
        console.log(data);
        switch(data.type) {
            case productType[0]:
                if(!data.fat){
                    data.fat = " "
                }
                return new MilkProducts(data.name, data.price, data.id, data.fat);
            case productType[1]:
                if(!data.weight){
                    data.weight = " "
                }
                return new Vegetables(data.name, data.price, data.id, data.weight);
            case productType[2]:
                if(!data.volume){
                    data.volume = " "
                }
                if(!data.alcohol){
                    data.alcohol = " "
                }
                return new Drinks(data.name, data.price, data.id, data.volume, data.alcohol);
            case productType[3]:
                if(!data.date){
                    data.date = " "
                }
                return new ShortTermProducts(data.name,data.price, data.id, data.date);
            default:
                throw new Error("Unknown type " + data.type);
        }
    }
}
