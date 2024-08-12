import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { CartButtonComponent } from './cart-button/cart-button.component';



@NgModule({
  declarations: [ProductComponent, CartButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [ProductComponent, CartButtonComponent]
})
export class SharedComponentsModule { }
