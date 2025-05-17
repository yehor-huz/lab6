import { ProductFirebaseService } from './product-firebase.service';
// product-filter.service.ts
import { inject, Injectable } from '@angular/core';
import { IProduct } from './iproduct';
import { ProductType, productType } from './product-type';
import { BehaviorSubject } from 'rxjs';
import { ProductFactory } from './product-factory';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  firebaseService = inject(ProductFirebaseService);

  private allProducts: IProduct[] = [];
  
  private selectedTypesSubject = new BehaviorSubject<Set<ProductType>>(new Set());
  private priceOrderSubject = new BehaviorSubject<'asc' | 'desc' | null>(null);
  private filteredProductsSubject = new BehaviorSubject<IProduct[]>([]);

  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor() {
    this.selectedTypesSubject.subscribe(() => this.applyFilters());
    this.priceOrderSubject.subscribe(() => this.applyFilters());
  }

  setProducts(products: IProduct[]): void {
    this.allProducts = products;
    console.log("List");
    console.log(this.allProducts)
    this.applyFilters();
  }

  updateSelectedTypes(selected: Set<ProductType>): void {
    this.selectedTypesSubject.next(selected);
  }

  addProduct(product: Object): void {
    this.firebaseService.addProduct(product).subscribe((addedId) => {
      product = {...product, id: addedId};
      const temp = ProductFactory.createProduct(product);
      this.allProducts = [...this.allProducts, temp];
    }
    )
    this.applyFilters();
  }

  removeProduct(id: string): void {
    this.allProducts = this.allProducts.filter(p => p.getId() !== id);
    this.applyFilters();
  }

  setPriceOrder(order: 'asc' | 'desc' | null): void {
    this.priceOrderSubject.next(order);
  }

  private applyFilters(): void {
    let result = [...this.allProducts];

    const selectedTypes = this.selectedTypesSubject.getValue();
    const priceOrder = this.priceOrderSubject.getValue();

    if (selectedTypes.size > 0) {
      result = result.filter(product => selectedTypes.has(product.getType() as ProductType));
    }

    if (priceOrder === 'asc') {
      result.sort((a, b) => a.getPrice() - b.getPrice());
    } else if (priceOrder === 'desc') {
      result.sort((a, b) => b.getPrice() - a.getPrice());
    }

    this.filteredProductsSubject.next(result);
  }

  updateProduct(updatedProduct: IProduct) {
    this.allProducts = this.allProducts.map(p => 
      p.getId() === updatedProduct.getId() ? updatedProduct : p
    );
    this.applyFilters();
  }
}

