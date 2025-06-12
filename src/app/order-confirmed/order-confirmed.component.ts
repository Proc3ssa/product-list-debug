import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Dessert } from '../interfaces/main';

@Component({
  selector: 'app-order-confirmed',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss'
})
export class OrderConfirmedComponent {
  
  @Input() isOrderConfirmedVisible: boolean = false;
  @Input() cartItems$: Observable<Dessert[]> | undefined;
  @Output() closeModal = new EventEmitter<void>();
 
  onClose() {
    this.closeModal.emit();
  }
 }
