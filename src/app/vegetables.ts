import { Product } from "./product";

export class Vegetables extends Product{
    private weight: number;
    constructor(
        name: string,
        price: number,
        id: string,
        weight: number
    ) {
        if(weight < 0){throw new Error('Weight must be positive')}
        super(name, price, id);
        this.weight = weight;
    }

    getWeight(): number{
        return this.weight;
    }

    override getDetails(): Object {
        return {name: this.getName(), price: this.getPrice(), weight: this.getWeight(), type: this.getType()};
    }

    override getType(): string {
        return 'Vegetables';
    }

    setWeight(weight: number): void {
        if(weight < 0){throw new Error("WEight must be positive")}
        this.weight = weight;
    }

    override getStrDetails(): string[] {
        let details = [];
        details.push('Name:' + this.getName());
        details.push('Price: ' + this.getPrice());
        //details.push('ID:' + this.getId());
        details.push('Weight: ' + this.getWeight());
        return details;
    }
    
}
