export interface IProduct {
    getId(): string;
    getName(): string;
    getPrice(): number;
    getType(): string;
    getDetails(): Object;
    getStrDetails() : string[];
    setPrice(price: number) :void;
    setName(name: string): void;
    
}
