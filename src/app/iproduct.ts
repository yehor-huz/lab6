export interface IProduct {
    getId(): Symbol;
    getName(): string;
    getPrice(): number;
    getType(): string;
    getDetails(): string[];
}
