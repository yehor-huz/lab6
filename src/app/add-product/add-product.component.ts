import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductType, productType } from '../product-type';
import { ProductFactory } from '../product-factory';
import { IProduct } from '../iproduct';
import { CommonModule } from '@angular/common';
import { 
  IonButton, IonContent, IonHeader, IonTitle, IonToolbar, 
  IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonList, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButtons } from '@ionic/angular/standalone';
import { dateValidate } from '../datevalidator';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [IonButtons, 
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonList,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() showForm: boolean = false;
  @Output() productAdded = new EventEmitter<IProduct>();
  @Output() formClosed = new EventEmitter<void>();

  productForm: FormGroup;
  currentType: ProductType = productType[0];
  availableTypes = productType;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: [this.currentType, Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateFormControls();
    
    this.productForm.get('type')?.valueChanges.subscribe(type => {
      this.currentType = type;
      this.updateFormControls();
    });
  }

  private updateFormControls(): void {
    // Remove old dynamic controls
    ['fat', 'weight', 'volume', 'alcohol', 'date'].forEach(control => {
      if (this.productForm.contains(control)) {
        this.productForm.removeControl(control);
      }
    });

    // Add new controls based on type
    switch(this.currentType) {
      case 'MilkProducts':
        this.productForm.addControl('fat', this.fb.control('', [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]));
        break;
        
      case 'Vegetables':
        this.productForm.addControl('weight', this.fb.control('', [
          Validators.required,
          Validators.min(0)
        ]));
        break;
        
      case 'Drinks':
        this.productForm.addControl('volume', this.fb.control('', [
          Validators.required,
          Validators.min(0)
        ]));
        this.productForm.addControl('alcohol', this.fb.control('', [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]));
        break;
        
      case 'ShortTermProducts':
        this.productForm.addControl('date', this.fb.control('', [
          Validators.required,
          dateValidate
        ]));
        break;
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const product = ProductFactory.createProduct(formData);
      this.productAdded.emit(product);
      this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.formClosed.emit();
  }

  private resetForm(): void {
    this.productForm.reset({
      type: this.currentType
    });
    this.updateFormControls();
  }
}