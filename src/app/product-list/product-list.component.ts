import { Component, OnInit } from '@angular/core';
import { ProductLoader } from '../product-loader';
import { IProduct } from '../iproduct';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonCardSubtitle, IonList } from "@ionic/angular/standalone";
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [IonList, IonCardSubtitle, IonCardTitle,  IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonCardSubtitle, IonList, NgFor]
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  async ngOnInit() {
    this.products = await ProductLoader.loadProductsFromUrl('https://api.jsonbin.io/v3/b/67fd1b8e8a456b7966892404');
    console.log(this.products)
  }

  getCardColor(product: IProduct): string {
    const type = product.getType();
    if (type === 'MilkProducts') return 'light';
    if (type === 'Vegetables') return 'success';
    if (type === 'Drinks') return 'danger';
    return 'medium';
  }
}
