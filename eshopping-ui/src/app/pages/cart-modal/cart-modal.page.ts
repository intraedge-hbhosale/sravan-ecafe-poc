import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  products!: Observable<Product[]>
  total!: Observable<number>
  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  increase(product: Product) {
    this.cartService.addProduct(product);
  }

  decrease(product: Product) {
    this.cartService.decreaseProduct(product);
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
