import { Pipe, PipeTransform } from '@angular/core';
import { ShortTermProducts } from './short-term-products';
import { IProduct } from './iproduct';

@Pipe({
  name: 'sortByExpireDate'
})
export class SortByExpireDatePipe implements PipeTransform {
  transform(products: IProduct[], direction: 'asc' | 'desc' = 'desc'): IProduct[] {
    if (!products || products.length === 0) return [];

    const shortTermProducts = products.filter(
      (product): product is ShortTermProducts => product instanceof ShortTermProducts
    );
    const otherProducts = products.filter(
      product => !(product instanceof ShortTermProducts)
    );

    const sortedShortTermProducts = [...shortTermProducts].sort((a, b) => {
      const dateA = new Date(a.getExpireDate()).getTime();
      const dateB = new Date(b.getExpireDate()).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return [...sortedShortTermProducts, ...otherProducts];
    

  }
}