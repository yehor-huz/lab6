import { Product } from "./product";

export class ShortTermProducts extends Product{
    private expireDate: Date;
    constructor(
        name: string,
        price: number,
        id: string,
        expireDate: Date | string
    ) {
        if(typeof(expireDate) == 'string'){
            var tmp = new Date(expireDate)
            if(tmp < new Date()){throw new Error('Product is spoiled')}
        }
        else{
            if(expireDate < new Date()){throw new Error('Product is spoiled')}
            var tmp = expireDate;
        }
        
        super(name, price, id);
        this.expireDate = tmp;
    }

    getExpireDate(): Date{
        return this.expireDate;
    }

    override getDetails(): string[] {
        let details = [];
        details.push('Name:' + this.getName());
        details.push('Price: ' + this.getPrice());
        details.push('Expire date: ' + this.getExpireDate().toDateString());
        return details;
    }

    override getType(): string {
        return 'ShortTermProducts';
    }

    setExpireDate(date: string | Date): void {
        let newDate = new Date(date);
        if(date < new Date()){throw new Error("Prduct is spoiled")}
        this.expireDate = newDate;
    }
}
