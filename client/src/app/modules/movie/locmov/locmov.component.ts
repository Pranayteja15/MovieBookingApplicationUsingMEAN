import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-locmov',
  templateUrl: './locmov.component.html',
  styleUrls: ['./locmov.component.css']
})
export class LocmovComponent implements OnInit {

  bookForm:any = FormGroup;
  locationList: any = []
  movieList: any = []
  public result: any
  cinemaList: any=[];
  showList:any=[]
  showListId: any=[]
  
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService) { }


  onChangeLocation(){
    this.movieList = []
    // console.log("the selected value is " + );
      this.auth.getMoviesbyLocation(this.bookForm.value.location)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){alert("No Shows")}
        else{for(let item of res){
          if(this.movieList.indexOf(item.title) == -1) {
                this.movieList.push(item.title);}
        }}
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  onChangeMovie(){
    this.cinemaList = []
    // console.log("the selected value is " + );
      this.auth.getCinemasbyLocMov(this.bookForm.value.location,this.bookForm.value.movie)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){alert("No Shows")}
        else{
          for(let item of res){
          if(this.cinemaList.indexOf(item.name) == -1) {
                this.cinemaList.push(item.name);}
          // console.log(item.name)
        }}
        // console.log('success',res,this.cinemaList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  onChangeCinema(){
    this.showList = []
    // console.log("the selected value is " + );
      this.auth.getShowsbyLocMovCin(this.bookForm.value.location,this.bookForm.value.movie,this.bookForm.value.cinema)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){alert("No Shows")}
        else{
          for(let item of res){
          if(this.showList.indexOf(item) == -1) {
                this.showList.push(item);
                this.showListId.push(item.id)
              }
          // console.log(item.name)
        }}
        console.log('success',res,this.showList,this.showListId)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }




  show() {  
    // this.auth.set_title(this.bookForm.value.movie)
    // this.auth.set_city(this.bookForm.value.location)

    
    // this.router.navigateByUrl('/select');
    this.auth.set_showId(this.bookForm.value.show)
    this.router.navigateByUrl('/seats');
    console.log(this.bookForm.value.show)
    // this.auth.displayshows(this.bookForm.value.location,this.bookForm.value.movie)
    // .subscribe({
    //       next: (res) => {
    //         console.log('success',res)
    //         this.result=res
    //         // alert("detail")
    //         // this.router.navigate(['book'])
    //       },
    //       error: (err) => { console.log(err) 
    //         alert("invalid details")}
    //     })
    // .subscribe((data) =>{console.log('success', data) this.result=data} , error => console.log('error', error))  
}

// this.router.navigateByUrl('/user');

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      location: ['',Validators.required],
      movie: ['',Validators.required],
      cinema: ['',Validators.required],
      show: ['',Validators.required]
      // password:['',Validators.required],
      // email:['',Validators.compose([Validators.required,Validators.email])]
    })

    this.auth.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item.city)
        }
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid location details")}
    })

  
  }
}
