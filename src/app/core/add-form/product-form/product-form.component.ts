import { Component, Input, Optional } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products/products.service';
import { PricesService } from '../../../services/prices/prices.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchProductComponent } from '../../products/search-product/search-product.component';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  constructor(private productService: ProductsService, private pricesService: PricesService, @Optional() private dialogRef: MatDialogRef<SearchProductComponent>){}
  productForm = new FormGroup({
    userId: new FormControl("test", Validators.required),
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  });


  onSubmit() {
    
    if(this.productForm.invalid){
      console.log("Form not valid");
      return;
    }

    this.productService.sendCreateProductRequest(this.productForm.value).subscribe(result => {
      if(result.response){
        const body = result.body[0];
        if(this.dialogRef){
          this.pricesService.setLoadedProduct(body.id, body.title);
          this.dialogRef.close();
        };
      }
      this.productForm.reset();
    })


  }
}
