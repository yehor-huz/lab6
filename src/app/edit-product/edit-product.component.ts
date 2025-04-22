import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../iproduct';
import {
  IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonItem, IonLabel, IonList, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol, IonButtons, IonModal } from '@ionic/angular/standalone';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [IonModal, 
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons, ReactiveFormsModule, NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() isOpen = false;
  @Output() productUpdated = new EventEmitter<IProduct>();
  @Output() modalClosed = new EventEmitter<void>();

  productForm: FormGroup;
  productType: string;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      price: [0],
      weight: [0],
      volume: [0],
      alcohol: [0],
      fat: [0],
      date: ['']
    });
    this.productType = '';
  }

  ngOnInit(): void {
    if (this.product) {
      this.productType = this.product.getType();
      console.log(this.productType);
      this.initializeForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.productType = this.product.getType();
      this.initializeForm();
    }}

  private initializeForm(): void {
    this.productForm.patchValue({
      price: this.product.getPrice()
    });
    console.log(this.productType);

    switch(this.productType) {
      case 'MilkProducts':
        this.productForm.patchValue({ fat: (this.product as any).getFat() });
        break;
      case 'Vegetables':
        this.productForm.patchValue({ weight: (this.product as any).getWeight() });
        break;
      case 'Drinks':
        this.productForm.patchValue({ 
          volume: (this.product as any).getVolume(),
          alcohol: (this.product as any).getAlcohol() 
        });
        break;
      case 'ShortTermProducts':
        this.productForm.patchValue({ 
          volume: (this.product as any).getVolume(),
          date: (this.product as any).getExpireDate() 
        });
        break;
    }
  }

  onSave(): void {
    this.product.setPrice(this.productForm.value.price);

    switch(this.productType) {
      case 'MilkProducts':
        (this.product as any).setFat(this.productForm.value.fat);
        break;
      case 'Vegetables':
        (this.product as any).setWeight(this.productForm.value.weight);
        break;
      case 'Drinks':
        (this.product as any).setVolume(this.productForm.value.volume);
        (this.product as any).setAlcohol(this.productForm.value.alcohol);
        break;
      case 'ShortTermProducts':
        (this.product as any).setVolume(this.productForm.value.volume);
        (this.product as any).setExpireDate(this.productForm.value.date);
        break;
    }

    this.productUpdated.emit(this.product);
    this.closeModal();
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}