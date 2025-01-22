import { Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { QuickPriceRequest } from '../../../model/quick-price-request';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';
import { Position } from '../../../model/position';

@Component({
  selector: 'app-product-element',
  imports: [ReactiveFormsModule],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.css'
})
export class ProductElementComponent {
  @Input()
  productObject!: Product;
  price = new FormControl();
  productStatistics: any = {};


  constructor(private router: Router, private analyticsService: AnalyticsService, private locationService: LocationService){}

  redirectToPrices(){
    this.router.navigate(["/search"], {queryParams: {product: this.productObject.title, id: this.productObject.id}});
  }

  submitQuickPriceAnalysis(){
    const position: Position = this.locationService.getPosition();
    const request: QuickPriceRequest = {
      productId: this.productObject.id,
      currency: "PLN",
      price: this.price.value,
      coordinates: {lon: position.lon, lat: position.lat}
    }

    this.analyticsService.quickPriceAnalysis(request).subscribe( resp => this.productStatistics = resp);
  }
  
}
