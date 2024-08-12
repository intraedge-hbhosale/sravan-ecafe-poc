import { Pipe, PipeTransform } from '@angular/core';
import { Product, Category } from '../services/product.service';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], filter: Category): Product[] {
    if (!filter) {
      return products;
    } else {
      return products.filter(p => p.categories == filter.id);
    }
  }

}