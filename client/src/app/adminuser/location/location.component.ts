import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }
  locationForm:any = FormGroup;
  locationList:any=[]

 

  addlocation() {
    console.log(this.locationForm.value.city)
    const obj ={
      city: this.locationForm.value.city,
    };
    return this.http.post("http://localhost:9000/location/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
      
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}
  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      city: new FormControl('', Validators.required)
    })
    this.srv.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

}
