import { Component, signal, OnInit } from '@angular/core';
import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { Dessert } from './interfaces/main'; // Import the Dessert model


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

  constructor(private productService : ProductService) {
    
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
};
