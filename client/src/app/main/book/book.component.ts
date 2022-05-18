import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookForm:any = FormGroup;
  locationList: any = []
  movieList: any = []
  public result: any
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService) { }


  onChangeLocation(){
    this.movieList = []
    
      this.auth.getMoviesbyLocation(this.bookForm.value.location)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){alert("No Shows")}
        else{for(let item of res){
          if(this.movieList.indexOf(item.title) == -1) {
                this.movieList.push(item.title);}
        }}
       
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  show() {  
    this.auth.set_title(this.bookForm.value.movie)
    this.auth.set_city(this.bookForm.value.location)
    
    this.router.navigateByUrl('/select');
     
}



  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      location: ['',Validators.required],
      movie: ['',Validators.required]
    
    })

    this.auth.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item.city)
        }
       
      },
      error: (err) => { console.log(err) 
        alert("invalid location details")}
    })

  
  }

}
