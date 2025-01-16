import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Price } from '../../model/price';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../location/location.service';
import { SearchDto } from '../../model/search-dto';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  private URL: string = "http://localhost:8080/prices/v1"

  private initialPrice: Price = {
    userId: "",
    priceId: "",
    productId: "",
    location: {
      city: "",
      country: "",
      lat: 0,
      lon: 0
    },
    price: {
      currency: "",
      price: 0
    }
  }

  loadedPrices: BehaviorSubject<SearchDto> = new BehaviorSubject({product: "", prices: [this.initialPrice]});

  constructor(private httpClient: HttpClient, private locationService: LocationService) {}

  searchPricesFor(productId: string, title: string){
    const currentLocation = this.locationService.getPosition();
    this.httpClient.get<Price[]>(this.URL, {params: {long:currentLocation.lon , lat: currentLocation.lat, prodId: productId}}).subscribe(result => {
      this.loadedPrices.next({
        product: title,
        prices: result
      });
    });
  }

  subForPrices(){
    return this.loadedPrices.asObservable();
  }
}
