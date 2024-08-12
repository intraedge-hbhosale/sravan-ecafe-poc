import {AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
})
export class CartButtonComponent  implements AfterViewInit {
  cartItemCount: Observable<number> = this.cartService.getCartItemCount();
  @ViewChild('mycart', { read: ElementRef}) cartBtn!: ElementRef;
  constructor(private cartService: CartService, private animationCtrl: AnimationController, private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    const cartAnimation = this.animationCtrl.create('cart-animation');
    cartAnimation
    .addElement(this.cartBtn.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)'},
      { offset: 0.5, transform: 'scale(1.2)'},
      { offset: 0.8, transform: 'scale(0.9)'},
      { offset: 1, transform: 'scale(1)'}
    ])
    .duration(300)
    .easing('ease-out');

    this.cartItemCount.subscribe(() => {
      cartAnimation.play();
    });
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage
    });
    await modal.present();
  }

}
