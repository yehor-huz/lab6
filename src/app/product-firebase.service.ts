import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
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

  addProduct(product: Object): Observable<string> {
    const promise = addDoc(this.productCollection, product).then((response) => response.id);
    return from(promise);
  }

  deleteProduct(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'products/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
  
  updateProduct(product: IProduct): Observable<void> {
    const docRef = doc(this.firestore, 'products/' + product.getId());
    const promise = setDoc(docRef, product.getDetails());
    return from(promise);
  }
  
}
