import { Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-element',
  imports: [],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.css'
})
export class ProductElementComponent {
  @Input()
  productObject!: Product;

  constructor(private router: Router){}

  redirectToPrices(){
    this.router.navigate(["/search"], {queryParams: {product: this.productObject.title, id: this.productObject.id}});
  }
  
}
