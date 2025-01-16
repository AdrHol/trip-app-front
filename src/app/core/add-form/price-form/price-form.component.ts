import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';
import { Position } from '../../../model/position';
import { PricesService } from '../../../services/prices/prices.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchProductComponent } from '../../products/search-product/search-product.component';

@Component({
  selector: 'app-price-form',
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css'
})
export class PriceFormComponent {

  productSearchRevealed: boolean = false;

  constructor(private locationService: LocationService, private priceService: PricesService, private dialog: MatDialog){}

  priceForm = new FormGroup({
    userId: new FormControl("", Validators.required),
    productId: new FormControl("", Validators.required),
    currency: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    lat: new FormControl(0, Validators.required),
    lon: new FormControl(0, Validators.required)
  });

  onSubmit(){
    this.loadMetaData();
    if(this.priceForm.invalid){
      console.log("Validation of form");
      console.log(this.priceForm.value);
      return;
    }

    console.log("adding price: --------");
    console.log(this.priceForm.value);

    this.priceService.addPrice(this.priceForm.value).subscribe(result => {
      if(result){
        console.log(result);
        this.priceForm.reset();
        this.priceService.clearLoadedProduct();
      }
    })
  }

  openProductSearch(){
    this.dialog.open(SearchProductComponent, {
      width: '250px',
      data: {
        message: 'Hello moto'
      }
    })
  }

  private loadMetaData(){
    const currentLocation: Position = this.locationService.getPosition();
    if(!currentLocation){
      console.error("Faild to load metadata during request processing");
      return;
    }
    const productData = this.priceService.getLoadedProduct();
    if(!productData){
      console.error("Cannot add price to empty product");
      return;
    }
    console.log(this.priceForm.controls.lat.value);

    const latToForm = currentLocation.lat; 
    const lonToForm = currentLocation.lon;
   
    this.priceForm.patchValue({
      userId: "test",
      productId:productData.id,
      lat:  latToForm,
      lon: lonToForm
    })

  }

  get LoadedProductData(){
    return this.priceService.getLoadedProduct();
  }

}
