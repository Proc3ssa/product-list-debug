import { Component, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../interfaces/main';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})
export class AddToCartComponent implements OnDestroy {
  @Input() product!: Dessert;
  isAddedToCart = false;
  quantity: number = 0;
  private cartSubscription: Subscription;

  constructor(public cartService: CartService) {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.quantity = items?.find(item => item?.name === this.product?.name)?.quantity ?? 0;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.isAddedToCart = true;
  }

  decreaseProductItem() {
    this.cartService.decreaseQuantity(this.product);
  }

  increaseProductItem() {
    this.cartService.increaseQuantity(this.product);
  }
}
