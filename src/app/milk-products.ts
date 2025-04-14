import { Product } from "./product";

export class MilkProducts extends Product{
    private fat: number;
    constructor(
        name: string,
        price: number,
        fat: number
    ) {
        if(fat < 0 || fat > 85){throw new Error('Fat must be between 0% and 85%')}
        super(name, price);
        this.fat = fat;
    }

    getFat(): number{
        return this.fat;
    }

    override getDetails(): string[] {
        let details = [];
        details.push('Name:' + this.getName());
        details.push('Price: ' + this.getPrice());
        //details.push('ID:' + this.getId());
        details.push('Fat: ' + this.getFat() + "%");
        return details;
    }

    override getType(): string {
        return 'MilkProducts';
    }
    
}
