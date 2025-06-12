import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';
import { Dessert } from '../interfaces/main';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const mockCartItems: Dessert[] = [
    { name: 'Cake', category: 'pastry', price: 5, description: 'Delicious cake', image: { thumbnail: 'cake.jpg', mobile: 'cake.jpg', tablet: 'cake.jpg', desktop: 'cake.jpg' }, quantity: 1 },
    { name: 'Brownie', category: 'pastry', price: 3, description: 'Chewy brownie', image: { thumbnail: 'brownie.jpg', mobile: 'brownie.jpg', tablet: 'brownie.jpg', desktop: 'brownie.jpg' }, quantity: 2 }
  ];

  beforeEach(async () => {
    const cartServiceMock = {
      cartItems$: of(mockCartItems),
      cartTotal$: of(11),
      cartCount$: of(3),
      addToCart: jasmine.createSpy('addToCart'),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      increaseQuantity: jasmine.createSpy('increaseQuantity'),
      decreaseQuantity: jasmine.createSpy('decreaseQuantity'),
      clearCart: jasmine.createSpy('clearCart')
    };

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items', () => {
    const cartItems = fixture.nativeElement.querySelectorAll('.cart-item');
    expect(cartItems.length).toBe(2);
  });

  it('should display the correct cart total', () => {
    const cartTotal = fixture.nativeElement.querySelector('.cart-total');
    expect(cartTotal.textContent).toContain('11');
  });
});
