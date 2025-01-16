import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SearchProductComponent } from '../products/search-product/search-product.component';
import { AdvancedSearchService } from '../../services/advancedSearch/advanced-search.service';
import { Price } from '../../model/price';
import { PriceResultComponent } from './price-result/price-result.component';
import { SearchDto } from '../../model/search-dto';
import { MarkerWrapper } from '../../model/marker-wrapper';

@Component({
  selector: 'app-advanced-search',
  imports: [LeafletModule, SearchProductComponent, PriceResultComponent],
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
})
export class AdvancedSearchComponent implements OnInit, AfterViewChecked {

  map: L.Map | undefined;
  currentlySelectedPrices: Price[] = [];
  productTitle: string = "";
  mapMarkes: MarkerWrapper[] = [];
  pricesOrder: string = "asc";
  selectedMarker: L.Marker | undefined = undefined; 

  constructor(private locationService: LocationService, private searchService: AdvancedSearchService) {

  }

  ngOnInit(): void {
    this.locationService.trackPosition().subscribe(pos => {
      if(pos.initial){
        return;
      }
      if(this.map === undefined){
        this.initializeMap();
      }

      this.setMapCenter(pos.lat, pos.lon);

    })
    this.searchService.subForPrices().subscribe(result => {
      this.onPricesResponse(result)
      this.sortPrices();
    })
  }

  ngAfterViewChecked(): void {
    this.map?.invalidateSize(true);
  }

  initializeMap(){
    if(this.locationService.getPosition().initial){
      return;
    }

    this.map = L.map('map').setView([this.locationService.getPosition().lat, this.locationService.getPosition().lon], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.map);
  }

  isInitialResponse(response: SearchDto){
    return response.product === "";
  }

  setMapCenter(lat: number, lon: number){
    if(this.map === undefined){
      return;
    }

    this.map.setView([lat, lon], 15);
  }

  changeSort(){
    this.pricesOrder = this.pricesOrder === "asc" ? "desc" : "asc";
    this.sortPrices();
  }

  popupPrice(priceId: string){
    const marker: MarkerWrapper | undefined = this.mapMarkes.find(marker => marker.id === priceId);
    if(marker){
      marker.marker.openPopup();
    }
  }

  private sortPrices(){
    if(this.pricesOrder === "asc"){
      this.currentlySelectedPrices.sort((a,b) => a.price.price - b.price.price);
    } 
    if(this.pricesOrder === "desc"){
      this.currentlySelectedPrices.sort((a,b) => b.price.price - a.price.price);
    }

    console.log(this.currentlySelectedPrices);
  }

  private onPricesResponse(result: SearchDto){
    if(this.isInitialResponse(result)){
      return
    }

    this.currentlySelectedPrices = result.prices;
    this.productTitle = result.product;
    this.handleMarkersLogic();
  }

  private handleMarkersLogic(){
    if(this.mapMarkes.length > 0){
      this.clearMapMarkes();
    }
    this.addMarkersToMap();
  }

  private addMarkersToMap(){
    if(this.map === undefined) {
      return;
    }

    this.currentlySelectedPrices.forEach(price => {
      const marker: MarkerWrapper = {
        id: price.priceId,
        marker: L.marker([price.location.lat, price.location.lon]).addTo(this.map!)
                                                                  .bindPopup(price.price.price + " " + price.price.currency)
      };

      this.mapMarkes.push(marker);
    })
  }

  private clearMapMarkes(){
    this.mapMarkes.forEach(marker => {
      this.map?.removeLayer(marker.marker);
    })
  }

}