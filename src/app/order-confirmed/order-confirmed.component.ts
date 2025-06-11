import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-confirmed',
  imports: [],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss'
})
export class OrderConfirmedComponent {
  
  @Input() isOrderConfirmedVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
 
  onClose() {
    this.closeModal.emit();
  }
 }
