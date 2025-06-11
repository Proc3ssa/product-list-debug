import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { Dessert } from './interfaces/main'; // Import the Dessert model


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddToCartComponent, OrderConfirmedComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Product list';
  desserts:Dessert[] | null = null;

  constructor() {
    this.desserts = desseretData;
  };

  isOrderConfirmedVisible: boolean = false;

  toggleOrderConfirmed() {
    this.isOrderConfirmedVisible = !this.isOrderConfirmedVisible;
  }
};
