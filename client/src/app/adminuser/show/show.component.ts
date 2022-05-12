import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  cityId: any;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  showForm:any = FormGroup;
  showList:any=[]
  showNameList:any=['11:00 AM','2:30 PM','6:45 PM','10:00 PM']
  // locationList:any=[]
  // locationId:any=[]
  movieList:any=[]
  movieIdList:any=[]
  cinemaList:any=[]
  cinemaIdList:any=[]
  cityList:any=[]
  cityIdList:any=[]


  // getAllShows(){

  // }

  addshow() {
    console.log(this.showForm.value)
    let cinemaid= this.cinemaList.indexOf(this.showForm.value.cinemaId)
    let movieid= this.movieList.indexOf(this.showForm.value.movieId)
    // let cityid= this.cityList.indexOf(this.showForm.value.cityId)
    const obj ={
      startAt: this.showForm.value.startAt,
      movieId:this.movieIdList[movieid],
      cinemaId: this.cinemaIdList[cinemaid],
      // cityId: this.cityId[cityid],
    };
    return this.http.post("http://localhost:9000/showtime/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        // alert("logged in")
        // this.router.navigateByUrl('book')
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}
  ngOnInit(): void {
    this.showForm = this.formBuilder.group({
      startAt: new FormControl('', Validators.required),
      movieId: new FormControl('', Validators.required),
      cinemaId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required)
    })

    this.srv.getCinemas()
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.cinemaList.push(item.name)
            this.cinemaIdList.push(item.id)
          }
          // console.log('success',res,this.cinemaList,this.cinemaId)
        },
        error: (err) => { console.log(err) 
          alert("invalid movie details")}
      })

    this.srv.getMovies()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.movieList.push(item.title)
          this.movieIdList.push(item._id)
        }
        // console.log('success',this.movieIdList,this.movieList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
    this.srv.getShows()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.showList.push(item)
        }
        // console.log('success',res,this.showList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

}
