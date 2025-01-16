import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Position } from '../../model/position';
import { flush } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private position: BehaviorSubject<Position> = new BehaviorSubject({
    initial: true,
    lat: 0,
    lon: 0
  });

  constructor() { }

  startTracking(): void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(callback => {
        let currentPosition: Position = {
          initial: false,
          lat: callback.coords.latitude,
          lon: callback.coords.longitude
        }
        this.position.next(currentPosition);
      }, 
    error => {
      console.error("Error during location extraction", error);
    })
    } else {
      console.error("Localization not supported")
    }
  }

  trackPosition(): Observable<Position> {
    return this.position.asObservable();
  }

  getPosition(): Position {
    console.log("position : ")
    console.log(this.position.getValue());
    return this.position.getValue();
  }

  changeCoord(lat: number, lon: number){
    this.position.next({
      initial: false,
      lat,
      lon
    })
  }
}
