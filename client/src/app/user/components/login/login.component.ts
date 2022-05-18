import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
// import { NotificationService } from './notification.service';
import { CommonService } from 'src/app/common.service';
import {ToastrService} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  result:any
  // users:any = [];
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService,private http:HttpClient) { }
  // showToastr(){
  //   this.toastr.success('loggedin','title')
  // }
  // showToasterSuccess() {
  //   this.notifyService.showSuccess(
  //     'Data shown successfully !!',
  //   );
  // }

   login() {
    console.log(this.loginForm.value)
    this.auth.loginUser(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe({
            next: (res) => {
              
              this.result=res
              this.auth.setisLoggedin(true)
              this.auth.setRole(this.result.role)
              alert("logged in")
              if(this.result.token){
                localStorage.setItem('token' , this.result.token)
                localStorage.setItem('id',this.result._id)
                localStorage.setItem('role',this.result.role)
                // console.log('success',this.result.token)
                this.router.navigate([''])
                // console.log(this.auth.getisLoggedin())
              }

            },
            error: (err) => { console.log(err) 
              alert("invalid details")}
          })
    // const obj ={
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password
    // }
    // console.log(obj)
    // this.http.post('http://localhost:9000/login',obj)
}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])]
    })

  }

  goToRegister(){
    this.router.navigate(['users/register'])
  }

}
