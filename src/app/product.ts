import { IProduct } from "./iproduct";

export abstract class Product implements IProduct{
    private name: string;
    private id: string;
    private price: number;
    constructor(name: string, price: number, id: string)
    {
        if(name.length == 0){throw new Error("Wrong name")}
        if(price <= 0.01){throw new Error("Wrong price")}
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getType(): string {
        return 'Product';
    }

    getDetails() : Object {
        return {};
    }

    setPrice(price: number): void {
        if(price < 0) {throw new Error("Invalid price")}
        this.price = price;
    }

    getStrDetails() : string[]{
        return [];
    }
}
