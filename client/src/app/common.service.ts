import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url:any = 'http://localhost:9000';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.url+'/users');
  }

  getLocations(){
    return this.http.get<any>(this.url+'/location/all')
  }

  getMovies(){
    return this.http.get<any>(this.url+'/movie/all')
  }

  getCinemas(){
    return this.http.get<any>(this.url+'/cinema/all')
  }

  getShows(){
    return this.http.get<any>(this.url+'/showtime/all')
  }
}
