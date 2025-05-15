export interface IProduct {
    getId(): string;
    getName(): string;
    getPrice(): number;
    getType(): string;
    getDetails(): string[];
    setPrice(price: number) :void;
    
}
