import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from './iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductFirebaseService {
  firestore = inject(Firestore);
  productCollection = collection(this.firestore, 'products');

  getProducts(): Observable<IProduct[]> {
    return collectionData(this.productCollection, {
      idField: 'id',
    }) as Observable<IProduct[]>
  }
  
}
