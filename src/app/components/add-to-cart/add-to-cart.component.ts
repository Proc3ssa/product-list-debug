import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../interfaces/main';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})
export class AddToCartComponent {
  @Input() product!: Dessert;
  isAddedToCart = false;
  quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.isAddedToCart = true;
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.isAddedToCart = false;
      this.quantity = 1;
    }
  }

  increaseProductItem() {
    ++this.quantity;
  }
}
