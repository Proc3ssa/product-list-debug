import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Dessert } from '../interfaces/main';
import { GetTotalPipe } from '../pipes/get-total.pipe';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-confirmed',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, GetTotalPipe],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss'
})
export class OrderConfirmedComponent {

  constructor(private cartService: CartService) {}
  
  @Input() isOrderConfirmedVisible: boolean = false;
  @Input() cartItems$: Observable<Dessert[]> | undefined;
  @Output() closeModal = new EventEmitter<void>();
 
  onClose() {
    this.cartService.clearCart();
    this.closeModal.emit();
  }
 }
