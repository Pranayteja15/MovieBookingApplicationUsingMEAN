import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  movieForm:any = FormGroup;
  movieList:any=[]


  addmovie() {
    console.log(this.movieForm.value)
    const obj ={
      title: this.movieForm.value.title,
      language:this.movieForm.value.language,
      genre: this.movieForm.value.genre
    };
    return this.http.post("http://localhost:9000/movie/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required)
    })
    this.srv.getMovies()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.movieList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

}
