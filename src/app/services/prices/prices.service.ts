import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PricesCreationRequest } from '../../model/prices-creation-request';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  private URL: string = "http://localhost:8080/prices/v1"

  private loadedProduct : {id: string, title:string} | undefined = undefined;

  constructor(private httpClient: HttpClient) { }


  addPrice(priceDTO: any){
    const body: PricesCreationRequest = {
      userId : priceDTO.userId,
      productId : priceDTO.productId,
      currency: priceDTO.currency,
      price: priceDTO.price,
      lat: priceDTO.lat,
      lon: priceDTO.lon
    }
    
    return this.httpClient.post(this.URL + "/add", body);
  }

  setLoadedProduct(id: string, title: string){
    this.loadedProduct = {
      id, title
    }
  }

  getLoadedProduct(){
    return this.loadedProduct;
  }

  clearLoadedProduct(){
    this.loadedProduct = undefined;
  }
}
