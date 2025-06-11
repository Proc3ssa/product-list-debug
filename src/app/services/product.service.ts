import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dessert } from '../interfaces/main';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsKey = 'products';
  private cartKey = 'cart';
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.dataUrl);
  }

  getProductsFromLocalStorage(): Dessert[] {
    const productsString = localStorage.getItem(this.productsKey);
    return productsString ? JSON.parse(productsString) : [];
  }

  setProductsToLocalStorage(products: Dessert[]): void {
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  getCartItems(): Dessert[] {
    const cartString = localStorage.getItem(this.cartKey);
    return cartString ? JSON.parse(cartString) : [];
  }

  addToCart(product: Dessert): void {
    const cart = this.getCartItems();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}