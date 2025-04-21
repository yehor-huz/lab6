import { Component, OnInit } from '@angular/core';
import { ProductLoader } from '../product-loader';
import { IProduct } from '../iproduct';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonCardSubtitle, IonList, IonButton } from "@ionic/angular/standalone";
import { NgFor, CommonModule } from '@angular/common';
import { ProductType, productType } from '../product-type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [IonButton, IonList, IonCardSubtitle, IonCardTitle,  IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonCardSubtitle, IonList, NgFor]
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  async ngOnInit() {
    this.products = await ProductLoader.loadProductsFromUrl('https://api.jsonbin.io/v3/b/67fd1b8e8a456b7966892404');
    console.log(this.products)
  }

  getCardColor(product: IProduct): string {
    const rainbowColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'];
    const type = product.getType() as ProductType;
    const index = productType.indexOf(type);
    return index !== -1 ? rainbowColors[index % rainbowColors.length] : 'medium';
  }

  deleteProduct(id: Symbol) {
    this.products = this.products.filter(p => p.getId() !== id);
  }
}
