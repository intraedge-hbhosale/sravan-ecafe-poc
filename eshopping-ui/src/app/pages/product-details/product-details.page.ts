import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product!: Product;
  showLoader = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.showLoader = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id!).subscribe((res) => {
      console.log('product', res);
      this.product = res;
      this.showLoader = false;
    });
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }
}
