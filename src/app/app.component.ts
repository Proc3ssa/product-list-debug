import { Component, signal, OnInit } from '@angular/core';
import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { Dessert } from './interfaces/main';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';// Import the Dessert model


import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddToCartComponent, OrderConfirmedComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  title = 'Product list';
  desserts = signal<Dessert[]>([]);
  cartItems$: Observable<Dessert[]>;
  cartTotal$: Observable<number>;
  cartCount$: Observable<number>;

    constructor(private productService : ProductService, private cartService: CartService) {
      this.cartItems$ = this.cartService.cartItems$;
      this.cartTotal$ = this.cartService.cartTotal$;
      this.cartCount$ = this.cartService.cartCount$;
    };
  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.desserts.set(data);
      this.productService.setProductsToLocalStorage(data);
    }
    );
  }

  isOrderConfirmedVisible: boolean = false;

  toggleOrderConfirmed() {
    this.isOrderConfirmedVisible = !this.isOrderConfirmedVisible;
  }

  removeFromCart(product: Dessert) {
    this.cartService.removeFromCart(product);
  }
};
