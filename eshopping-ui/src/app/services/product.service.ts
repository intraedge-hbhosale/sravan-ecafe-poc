import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export interface Product {
  _id: number;
  categories: number;
  name: string;
  thumbnail_image: string;
  detail_image: string;
  description: string;
  price: number;
  amount?: number;
}

export interface Category {
  id: number;
  name: string;
  detail_image: string;
  title: string;
  subtitle: string;
}

export interface Response {
  message: string;
  data: Product[];
}

export interface CategoryResponse {
  message: string;
  data: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.product_url;
  s3url = environment.s3Url;

  categoryNames: any;
  categories = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<{ message: string; data: Product[] }> {
    return this.http.get<Response>(`${this.url}/product`).pipe(
      map((products) => {
        for (let product of products.data) {
          product.thumbnail_image = `${this.s3url}${product.thumbnail_image}`;
          product.detail_image = `${this.s3url}${product.detail_image}`;
        }
        return products;
      })
    );
  }

  getCategories() {
    return this.http.get<{ message: string; data: Category[] }>(
      `${this.url}/category`
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<{ message: string; data: Product }>(`${this.url}/product/${id}`)
      .pipe(
        map((res) => {
          const product = res.data;
          product.thumbnail_image = `${this.s3url}${product.thumbnail_image}`;
          product.detail_image = `${this.s3url}${product.detail_image}`;
          console.log('product', product);
          return product;
        })
      );
  }

  getCategoryName(id: any) {
    return this.categories.asObservable().pipe(
      map((res) => {
        if (res) {
          return this.categoryNames[id].name;
        } else {
          return '';
        }
      })
    );
  }
}
