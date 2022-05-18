import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private isLoggedIn:boolean=false

public getisLoggedin(){
  return this.isLoggedIn
}
public setisLoggedin(value:any){
  this.isLoggedIn=value
}

private role:any='guest'
public setRole(value:string){
  this.role=value
}
public getRole(){
  return this.role
}
private userId=localStorage.getItem('id')
public isAdmin(){
  
    if(this.getRole()==='admin'){
      
      return true
    }
    else{
      return false
    }
}
public getUserId(){
  return this.userId
}

getToken(){
  return localStorage.getItem('token')
}

 private selected!:any

 public getSelected(){
   return this.selected
 }
 public setSelected(value:any){
   this.selected=value
 }


  private city!: string;
  public get_city(): string {
    return this.city;
  }
  public set_city(value: string) {
    this.city = value;
  }
  private title!: string;
  public get_title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }
  private showId!:string;
  public get_showId(): string {
    return this.showId;
  }
  public set_showId(value: string) {
    this.showId = value;
  }

  private url:string="http://localhost:9000"
  details!:any 
  constructor(private http:HttpClient,private router:Router) {}
 

  getLocations(){
    return this.http.get<any>(this.url+'/location/all')
  }

  getMovies(){
    return this.http.get<any>(this.url+'/movie/all')
  }

  getMoviesbyLocation(city:string){
    return this.http.get<any>(this.url+'/movie/'+city)
  }

  getCinemasbyLocMov(city:string,title:string){
    return this.http.get<any>(this.url+'/cinema/'+city+'/'+title)
  }

  getShowsbyLocMovCin(city:string,title:string,name:string){
    return this.http.get<any>(this.url+'/showtime/'+city+'/'+title+'/'+name)
  }

  getShowbyId(id:string){
    return this.http.get<any>(this.url+'/showtime/'+id)
  }

  book(id:string,seats:any){
    const obj={
      id:id,
      seats:seats
    }
    return this.http.post(this.url+'/showtime/book', obj)
    // http://localhost:9000/showtime/book
  }

  loginUser(email:string,password:string){
    const obj ={
      email: email,
      password: password
    };
    
    return this.http.post(this.url+'/login',obj)
 
  }

  signupUser(fname:string,lname:string,email:string,password:string){
    const obj ={
      first_name: fname,
      last_name: lname,
      email: email,
      password: password
    };
    return this.http.post(this.url+'/register',obj).subscribe({
      next: (res) => {
        console.log(res)
        alert("registered")
        this.router.navigate(['/user/login'])
      },
      error: (err) => { console.log(err) 
        alert("invalid details")}
    })
    console.log(obj)
  }
  displayshows(location:string, movie:string){
    const obj ={
      city:location,
      title:movie
    };
    return this.http.get<any>(this.url+'/showtime/'+obj.city+'/'+obj.title)
   
  }

}
