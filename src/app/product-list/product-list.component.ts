import { Component, OnInit } from '@angular/core';
import { ProductLoader } from '../product-loader';
import { IProduct } from '../iproduct';
import { ProductFilterService } from '../product-filter.service';
import { ProductType, productType } from '../product-type';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonContent, IonItem,
  IonList, IonLabel, IonSelectOption, IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [IonCheckbox, IonLabel, 
    IonButton, IonList, IonCardSubtitle, IonCardTitle,
    IonContent, IonCard, IonCardHeader, IonCardContent,
    IonItem, CommonModule, ReactiveFormsModule, IonSelectOption, FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  allTypes = productType;
  sortDirection: 'asc' | 'desc' | null = null;

  productTypesForm: FormGroup;
  filteredProducts: IProduct[] = [];

  constructor(
    private filterService: ProductFilterService,
    private fb: FormBuilder
  ) {
    this.productTypesForm = this.fb.group({
      sort: [null],
      ...this.allTypes.reduce((acc, type) => {
        acc[type] = [false];
        return acc;
      }, {} as Record<ProductType, any[]>)
    });
  }

  async ngOnInit() {
    const products = await ProductLoader.loadProductsFromUrl('https://api.jsonbin.io/v3/b/67fd1b8e8a456b7966892404');
    this.filterService.setProducts(products);

    this.filterService.filteredProducts$.subscribe(filtered => {
      this.filteredProducts = filtered;
    });
  }

  onCheckboxChange(event: Event, type: ProductType) {
    const checked = (event.target as HTMLInputElement).checked;
    this.productTypesForm.get(type)?.setValue(checked);
    this.applyFilters();
  }
  

  setSortDirection(direction: 'asc' | 'desc' | null) {

    const currentValue = this.productTypesForm.get('sort')?.value;
    const newValue = currentValue === direction ? null : direction;
    this.productTypesForm.get('sort')?.setValue(newValue);
    this.applyFilters();
  }
  
  applyFilters() {
    const selectedTypes = new Set<ProductType>(
      this.allTypes.filter(type => this.productTypesForm.get(type)?.value)
    );
    this.filterService.updateSelectedTypes(selectedTypes);
  
    const sortValue = this.productTypesForm.get('sort')?.value;
    this.filterService.setPriceOrder(sortValue);
  }
  

  getCardColor(product: IProduct): string {
    const rainbowColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'];
    const type = product.getType() as ProductType;
    const index = productType.indexOf(type);
    return index !== -1 ? rainbowColors[index % rainbowColors.length] : 'medium';
  }

  deleteProduct(id: Symbol) {
    this.filteredProducts = this.filteredProducts.filter(p => p.getId() !== id);
  }
}
