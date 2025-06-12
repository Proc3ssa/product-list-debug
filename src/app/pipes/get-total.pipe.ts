import { Pipe, PipeTransform } from '@angular/core';
import { Dessert } from '../interfaces/main';

@Pipe({
  name: 'getTotal',
  standalone: true
})
export class GetTotalPipe implements PipeTransform {
  transform(items: Dessert[]): number {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
}

describe('GetTotalPipe', () => {
  const pipe = new GetTotalPipe();

  it('should return 0 if no items are provided', () => {
    expect(pipe.transform([])).toBe(0);
  });

  it('should return the correct total', () => {
    const items: Dessert[] = [
      { name: 'Cake', category: 'pastry', price: 5, description: 'Delicious cake', image: { thumbnail: 'cake.jpg', mobile: 'cake.jpg', tablet: 'cake.jpg', desktop: 'cake.jpg' }, quantity: 1 },
      { name: 'Brownie', category: 'pastry', price: 3, description: 'Chewy brownie', image: { thumbnail: 'brownie.jpg', mobile: 'brownie.jpg', tablet: 'brownie.jpg', desktop: 'brownie.jpg' }, quantity: 2 }
    ];
    expect(pipe.transform(items)).toBe(11);
  });
});