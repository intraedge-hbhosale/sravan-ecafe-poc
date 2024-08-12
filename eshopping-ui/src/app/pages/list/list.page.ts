import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Category,
  Product,
  ProductService,
} from '../../services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  products!: Product[];
  categories!: BehaviorSubject<Category[]>;
  categoryFilter: any = null;
  showLoader = false;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.showLoader = true;
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res.data;
      console.log('Products', this.products);
    });
    this.showLoader = false;

    this.getAllCategories();
    // this.categories = this.productService.categories;
  }

  getAllCategories() {
    this.productService.getCategories().subscribe((res) => {
      console.log(res);
      // this.categoryNames = {};
      //   const out = res.data;
      //   for (let c of out) {
      //     c.detail_image = `${this.s3url}${c.detail_image}`;
      //     // this.categoryNames[c.id] = c;
      //   }
      //   // console.log('categoryNames: ', this.categoryNames);
      //   this.categories.next(out);
    });
  }

  async categoryChanged(event: any) {
    const index = this.swiperRef?.nativeElement.swiper.activeIndex;
    let cat = null;
    if (index > 0) {
      cat = this.categories.value.filter((cat) => cat.id == index)[0];
    }
    this.categoryFilter = cat;
    console.log('categoryFilter', this.categoryFilter);
  }
}
