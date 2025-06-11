import { Injectable } from '@angular/core';
import { Dessert } from '../interfaces/main';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Dessert[] = [];
  private cartTotal = 0;
  private cartCount = 0;

  private cartItemsSubject = new BehaviorSubject<Dessert[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  addToCart(product: Dessert) {
    const existingProduct = this.cartItems.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.updateCart();
  }

  removeFromCart(product: Dessert) {
    this.cartItems = this.cartItems.filter(item => item.name !== product.name);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    this.cartCount = this.cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
    this.cartItemsSubject.next(this.cartItems);
    this.cartTotalSubject.next(this.cartTotal);
    this.cartCountSubject.next(this.cartCount);
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
      this.updateCart();
    }
  }
}