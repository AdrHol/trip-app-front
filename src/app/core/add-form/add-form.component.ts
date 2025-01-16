import { Component } from '@angular/core';
import { PriceFormComponent } from './price-form/price-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-form',
  imports: [PriceFormComponent, ProductFormComponent, CommonModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {

  isProductVisible: boolean = true;
  isPriceVisible: boolean = false;

  productForm() {
    this.isProductVisible = true;
    this.isPriceVisible = false;
  }
  priceForm() {
    this.isProductVisible = false;
    this.isPriceVisible = true;
  }
}
