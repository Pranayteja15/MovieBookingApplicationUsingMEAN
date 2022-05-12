import { AuthService } from 'src/app/auth.service';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
// import { faSackDollar, faBusAlt, faMoneyCheckAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  // lowPriceIcon = faSackDollar;
  // busIcon = faBusAlt;
  // dealsIcon = faMoneyCheckAlt;
  // supportIcon = faHeadset;


  movieList:any=[]
  locationList:any=[]
  cinemaList:any=[]
  showList:any=[]
  // cinemaLocationList:any=[]
  constructor(private srv:CommonService) { }

  getAllMovies(){
    this.srv.getMovies()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.movieList.push(item)
        }
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  getAllLocations(){
    this.srv.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item)
        }
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  getAllCinemas(){
    this.srv.getCinemas()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.cinemaList.push(item)
        }
        // console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  getAllShows(){
    this.srv.getShows()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.showList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  // getAllCinemasbyLocation(){
  //   this.srv.getCinemasbyLocation()
  //   .subscribe({
  //     next: (res) => {
  //       for(let item of res){
  //         this.cinemaList.push(item)
  //       }
  //       // console.log('success',res,this.locationList)
  //     },
  //     error: (err) => { console.log(err) 
  //       alert("invalid movie details")}
  //   })
  // }

  ngOnInit(): void {
    
  }

}
