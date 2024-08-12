import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService, Product } from 'src/app/services/product.service';

ProductService
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {

  @Input()product!: any;
  category = '';

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getCategoryName(this.product.categories).subscribe(name => {
      console.log("name", name);
      this.category = name;
    });
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }
}
