import { IProduct } from "./iproduct";

export abstract class Product implements IProduct{
    private name: string;
    private id: Symbol;
    private price: number;
    constructor(name: string, price: number)
    {
        if(name.length == 0){throw new Error("Wrong name")}
        if(price <= 0.01){throw new Error("Wrong price")}
        this.id = Symbol();
        this.name = name;
        this.price = price;
    }

    getId(): Symbol {
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

    getDetails() : string[] {
        return [];
    }

    setPrice(price: number): void {
        if(price < 0) {throw new Error("Invalid price")}
        this.price = price;
    }
}
