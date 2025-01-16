import { Component, Input } from '@angular/core';
import { Price } from '../../../model/price';

@Component({
  selector: 'app-price-result',
  imports: [],
  templateUrl: './price-result.component.html',
  styleUrl: './price-result.component.css'
})
export class PriceResultComponent {
  @Input()
  price!: Price;

  get priceLabel(){
    return "Price: " + this.price.price.price + " " + this.price.price.currency;
  }
}
