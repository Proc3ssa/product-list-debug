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