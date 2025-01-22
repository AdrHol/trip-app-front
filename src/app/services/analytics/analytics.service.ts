import { Injectable } from '@angular/core';
import { QuickPriceRequest } from '../../model/quick-price-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private URI: string = "http://localhost:8080/analyze/v1";

  constructor(private client: HttpClient) { }


  quickPriceAnalysis(request: QuickPriceRequest){
    const body = request;
    return this.client.post(this.URI + "/quick", body);
  }
}
