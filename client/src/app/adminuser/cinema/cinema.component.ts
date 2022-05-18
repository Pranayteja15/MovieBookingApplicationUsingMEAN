import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  cinemaForm:any = FormGroup;
  cinemaList:any=[]
  locationList:any=[]
  locationId:any=[]

  
  
  addcinema() {
    let id= this.locationList.indexOf(this.cinemaForm.value.city)
    const obj ={
      name: this.cinemaForm.value.name,
      ticketPrice:this.cinemaForm.value.ticketPrice,
      city: this.locationId[id]
    };
    console.log(obj)
    return this.http.post("http://localhost:9000/cinema/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
      
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}
  ngOnInit(): void {
    this.cinemaForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })

      this.srv.getLocations()
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.locationList.push(item.city)
            this.locationId.push(item._id)
          }
          
        },
        error: (err) => { console.log(err) 
          alert("invalid movie details")}
      })

      this.srv.getCinemas()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.cinemaList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })


    }

}
