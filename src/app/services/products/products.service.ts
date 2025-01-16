import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';
import { ProductCreationBody } from '../../model/product-creation-body';
import { ProductServiceResponse } from '../../model/product-service-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL: string = "http://localhost:8080/products";

  constructor(private httpClient: HttpClient) { }


  getAllProduts(){
    return this.httpClient.get<Product[]>(this.URL + "/all");
  }
  
  getAllProductsByCoordinates(){

  }

  sendCreateProductRequest(productCreationRequest: any){
    const body: ProductCreationBody = {
      userId: productCreationRequest.userId,
      title: productCreationRequest.title, 
      description: productCreationRequest.description
    }

    return this.httpClient.post<ProductServiceResponse>(this.URL + "/add", body);
  }

  searchAsType(values: string){
    return this.httpClient.get<ProductServiceResponse>(this.URL + "/auto", {params: {query: values}});
  }
}
