import { ProductFirebaseService } from './../product-firebase.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductLoader } from '../product-loader';
import { IProduct } from '../iproduct';
import { ProductFilterService } from '../product-filter.service';
import { ProductType, productType } from '../product-type';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonContent, IonItem,
  IonList, IonLabel, IonSelectOption, IonCheckbox, IonModal, IonButtons, IonToolbar, IonHeader, IonTitle, IonIcon, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from "../edit-product/edit-product.component";
import { Drinks } from '../drinks';
import { ProductFactory } from '../product-factory';
import { AuthService } from '../auth.service';
import {SortByExpireDatePipe } from "../sort-by-date.pipe";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonIcon, IonTitle, IonHeader, IonToolbar, IonButtons,
    IonCheckbox, IonLabel, IonModal,
    IonButton, IonList, IonCardSubtitle, IonCardTitle,
    IonContent, IonCard, IonCardHeader, IonCardContent,
    IonItem, CommonModule, ReactiveFormsModule,
    IonSelectOption, FormsModule, AddProductComponent, EditProductComponent, NgIf, SortByExpireDatePipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  authService = inject(AuthService);
  allTypes = productType;
  sortDirection: 'asc' | 'desc' | null = null;
  showAddForm = false;
  showEditForm = false;
  selectedProduct: IProduct | null = null;
  productTypesForm: FormGroup;
  ProductFirebaseService = inject(ProductFirebaseService);
  filteredProducts: IProduct[] = [];
  showDeleteCategoryModal = false;
  selectedCategories: Set<ProductType> = new Set();

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
    this.ProductFirebaseService.getProducts().subscribe((products) => {
  const productList: IProduct[] = [];
  for (const productData of products) {
    try {
      const plainData = JSON.parse(JSON.stringify(productData));
      console.log("plainData", plainData); 
      const productItem = ProductFactory.createProduct(plainData);
      productList.push(productItem);
    } catch (error) {
      console.error(`Error creating product:`, error);
    }
  }
  this.filterService.setProducts(productList);
});
    this.filterService.filteredProducts$.subscribe(filtered => {
      this.filteredProducts = filtered;
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addProduct(data: Object) {
    this.filterService.addProduct(data);
    this.showAddForm = false;
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
    
    console.log(product.getDetails());
    const rainbowColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'];
    const type = product.getType() as ProductType;
    const index = productType.indexOf(type);
    return index !== -1 ? rainbowColors[index % rainbowColors.length] : 'medium';
  }

  deleteProduct(id: string) {
    this.filteredProducts = this.filteredProducts.filter(p => p.getId() !== id);
    this.filterService.removeProduct(id);
  }

openEditForm(product: IProduct) {
  this.selectedProduct = product;
  this.showEditForm = true;
  console.log('Opening edit form for:', product); 
}
  
  handleProductUpdate(updateData: {oldId: string, newProduct: Object}) {
    this.filterService.removeProduct(updateData.oldId);
    
    this.filterService.addProduct(updateData.newProduct);
    
    this.showEditForm = false;
  }

    deleteSelectedCategories(): void {
    const productsToDelete = this.filteredProducts.filter(
      product => this.selectedCategories.has(product.getType() as ProductType)
    );

    // Видаляємо кожен продукт
    productsToDelete.forEach(product => {
      this.filterService.removeProduct(product.getId());
    });

    this.selectedCategories.clear();
    this.showDeleteCategoryModal = false;
  }

  toggleCategorySelection(type: ProductType): void {
    if (this.selectedCategories.has(type)) {
      this.selectedCategories.delete(type);
    } else {
      this.selectedCategories.add(type);
    }
  }

}