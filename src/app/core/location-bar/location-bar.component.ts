import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { __makeTemplateObject } from 'tslib';
import { Position } from '../../model/position';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './location-bar.component.html',
  styleUrl: './location-bar.component.css'
})
export class LocationBarComponent implements OnInit{

  private location!: Position;
  latInput = new FormControl(0);
  lonInput = new FormControl(0);

  locationDisplay: string = "Tracking your position...";


  constructor(private locationService: LocationService){
  }

  ngOnInit(): void {
    this.locationService.trackPosition().subscribe(pos => {
      this.location = pos;
      if(!pos.initial){
        this.changeLocationDisplay(pos.lat, pos.lon);
      }
    })
    this.locationService.startTracking();
  }
  
  get longitude(): number{
    return this.location.lon;
  }
  get latitude(): number {
    return this.location.lat;
  }
  changeLocation(){
    this.locationService.changeCoord(this.latInput.value!, this.lonInput.value!);
  }

  private changeLocationDisplay(lat: number, lon: number){
    this.locationDisplay = `Latitude: ${lat}, Longitude: ${lon}`;
  }
}
