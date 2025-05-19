import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../iproduct';
import { ProductType, productType } from '../product-type';
import { ProductFactory } from '../product-factory';
import {
  IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonItem, IonLabel, IonList, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol, IonButtons, IonModal, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    IonModal, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonInput, IonItem, IonLabel, IonList, IonCard, IonCardContent,
    IonGrid, IonRow, IonCol, IonButtons, IonSelect, IonSelectOption,
    ReactiveFormsModule, NgIf, CommonModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() isOpen = false;
  @Output() productUpdated = new EventEmitter<{oldId: string, newProduct: Object}>();
  @Output() modalClosed = new EventEmitter<void>();

  productForm: FormGroup;
  availableTypes = productType;
  currentType: ProductType;

  constructor(private fb: FormBuilder) {
    this.currentType = productType[0];
    this.productForm = this.fb.group({
      type: [this.currentType, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      // Динамічні поля будуть додані/видалені в runtime
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.currentType = this.product.getType() as ProductType;
    
    this.productForm = this.fb.group({
      type: [this.currentType, Validators.required],
      name: [this.product.getName(), Validators.required],
      price: [this.product.getPrice(), Validators.required]
    });

    this.updateFormControls();

    // Заповнюємо специфічні поля
    switch(this.currentType) {
      case 'MilkProducts':
        this.productForm.addControl('fat', this.fb.control((this.product as any).getFat(), Validators.required));
        break;
      case 'Vegetables':
        this.productForm.addControl('weight', this.fb.control((this.product as any).getWeight(), Validators.required));
        break;
      case 'Drinks':
        this.productForm.addControl('volume', this.fb.control((this.product as any).getVolume(), Validators.required));
        this.productForm.addControl('alcohol', this.fb.control((this.product as any).getAlcohol(), Validators.required));
        break;
      case 'ShortTermProducts':
        this.productForm.addControl('volume', this.fb.control((this.product as any).getVolume(), Validators.required));
        this.productForm.addControl('date', this.fb.control((this.product as any).getExpireDate(), Validators.required));
        break;
    }
  }

  onTypeChange(newType: ProductType): void {
    if (newType !== this.currentType) {
      this.currentType = newType;
      this.updateFormControls();
    }
  }

  private updateFormControls(): void {
    ['fat', 'weight', 'volume', 'alcohol', 'date'].forEach(control => {
      if (this.productForm.contains(control)) {
        this.productForm.removeControl(control);
      }
    });

    switch(this.currentType) {
      case 'MilkProducts':
        this.productForm.addControl('fat', this.fb.control(0, Validators.required));
        break;
      case 'Vegetables':
        this.productForm.addControl('weight', this.fb.control(0, Validators.required));
        break;
      case 'Drinks':
        this.productForm.addControl('volume', this.fb.control(0, Validators.required));
        this.productForm.addControl('alcohol', this.fb.control(0, Validators.required));
        break;
      case 'ShortTermProducts':
        this.productForm.addControl('volume', this.fb.control(0, Validators.required));
        this.productForm.addControl('date', this.fb.control('', Validators.required));
        break;
    }
  }

  onSave(): void {
    if (this.productForm.invalid) return;

    const formData = this.productForm.value;
    const oldId = this.product.getId();

    const newProductData = {
      type: formData.type,
      name: formData.name,
      price: formData.price,
      ...this.getTypeSpecificData(formData)
    };

    this.productUpdated.emit({
      oldId: oldId,
      newProduct: newProductData
    });

    this.closeModal();
  }

  private getTypeSpecificData(formData: any): any {
    switch(this.currentType) {
      case 'MilkProducts':
        return { fat: formData.fat };
      case 'Vegetables':
        return { weight: formData.weight };
      case 'Drinks':
        return { volume: formData.volume, alcohol: formData.alcohol };
      case 'ShortTermProducts':
        return { volume: formData.volume, date: formData.date };
      default:
        return {};
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}