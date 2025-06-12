import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartComponent } from './add-to-cart.component';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../interfaces/main';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let cartService: CartService;

  const mockProduct: Dessert = { name: 'Cake', category: 'pastry', price: 5, description: 'Delicious cake', image: { thumbnail: 'cake.jpg', mobile: 'cake.jpg', tablet: 'cake.jpg', desktop: 'cake.jpg' } };

  beforeEach(async () => {
    const cartServiceMock = {
      addToCart: jasmine.createSpy('addToCart')
    };

    await TestBed.configureTestingModule({
      imports: [AddToCartComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToCart on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
