import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartItems = new BehaviorSubject(<Product[]>[]);
  private cartItemCount = new BehaviorSubject(0);
  public cartTotalValue = new BehaviorSubject(0);

  constructor() {}

  getCart() {
    return this.cartItems.asObservable();
  }

  getTotal() {
    return this.cartTotalValue.asObservable();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProduct(product: Product) {
    let p = this.cart.find((p) => p._id == product._id);

    if (p) {
      p.amount! += 1;
    } else {
      product.amount = 1;
      this.cart.push(product);
    }

    this.cartItems.next(this.cart);
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.updateTotalAmount();
  }

  decreaseProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        p.amount! -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItems.next(this.cart);
    this.cartItemCount.next(this.cartItemCount.value - 1);
    this.updateTotalAmount();
  }

  removeProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount!);
        this.cart.splice(index, 1);
      }
    }
    this.cartItems.next(this.cart);
  }

  getItemCount(id: any) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === id) {
        return p.amount;
      }
    }
    return 0;
  }

  updateTotalAmount() {
    const items = this.cartItems.value;
    const value = items.reduce((previous, current) => {
      previous += current.amount! * current.price;
      return previous;
    }, 0);
    this.cartTotalValue.next(value);
  }

  clearCart() {
    this.cart = [];
    this.cartItems.next(this.cart);
    this.cartItemCount.next(0);
    this.updateTotalAmount();
  }
}
