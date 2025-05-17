import { Product } from "./product";

export class Drinks extends Product{
    private volume: number;
    private alcohol: number;
    constructor(
        name: string,
        price: number,
        id: string,
        volume: number,
        alcohol: number
    ){
        super(name, price, id);
        if(volume < 0){throw new Error("Volume must be positive")}
        this.volume = volume;
        this.alcohol = alcohol;
    }
    getAlcohol(){
        return this.alcohol;
    }

    getVolume(){
        return this.volume;
    }

    override getDetails(): Object {
        return {name: this.getName(), price: this.getPrice(), volume: this.getVolume(), alcohol: this.getAlcohol(), type: this.getType()};
    }

    override getType(): string {
        return 'Drinks';
    }

    setVolume(volume: number): void {
        if(volume < 0){throw new Error("Volume must be positive")}
        this.volume = volume;
    }

    setAlcohol(alcohol: number) : void{
        if(alcohol < 0 || alcohol > 100){throw new Error("Alcohol must be positive and lesser than 100")}
        this.alcohol = alcohol;
    }

        override getStrDetails(): string[] {
        let details = [];
        details.push('Name:' + this.getName());
        details.push('Price: ' + this.getPrice());
        //details.push('ID:' + this.getId());
        details.push('Alcohol: ' + this.getAlcohol() + "%");
        details.push('Volume ' + this.getVolume() );
        return details;
    }
    
}
