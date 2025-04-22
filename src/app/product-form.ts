import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { productType } from "./product-type";
import { dateValidate } from './datevalidator';

export function productForm(
    type: string,
    productForm: FormGroup,
    fb: FormBuilder
) {
    const controlsToRemove = [
        'fat',
        'weight',
        'volume',
        'alcohol',
        'date'
    ];
    
    controlsToRemove.forEach(control => {
        if (productForm.contains(control)) {
            productForm.removeControl(control);
        }
    });

    switch(type) {
        case productType[0]:
            productForm.addControl('fat', fb.control('', [
                Validators.required,
                Validators.min(0),
                Validators.max(100) 
            ]));
            break;
            
        case productType[1]: 
            productForm.addControl('weight', fb.control('', [
                Validators.required,
                Validators.min(0) 
            ]));
            break;
            
        case productType[2]:
            productForm.addControl('volume', fb.control('', [
                Validators.required,
                Validators.min(0)
            ]));
            productForm.addControl('alcohol', fb.control('', [
                Validators.required,
                Validators.min(0),
                Validators.max(100) 
            ]));
            break;
            
        case productType[3]:
            productForm.addControl('date', fb.control('', [
                Validators.required,
                dateValidate
            ]));
            break;
            
        default:
            throw new Error("Unknown product type: " + type);
    }
}