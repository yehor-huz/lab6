import { Product } from "./product";

export class Vegetables extends Product{
    private weight: number;
    constructor(
        name: string,
        price: number,
        weight: number
    ) {
        if(weight < 0){throw new Error('Weight must be positive')}
        super(name, price);
        this.weight = weight;
    }

    getWeight(): number{
        return this.weight;
    }

    override getDetails(): string[] {
        let details = [];
        details.push('Name:' + this.getName());
        details.push('Price: ' + this.getPrice());
        //details.push('ID:' + this.getId());
        details.push('Weight: ' + this.getWeight());
        return details;
    }

    override getType(): string {
        return 'Vegetables';
    }
    
}
