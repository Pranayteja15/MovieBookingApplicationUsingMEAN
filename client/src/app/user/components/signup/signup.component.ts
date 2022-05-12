import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService) { }

  signupForm:any = FormGroup;

  signup() {
    console.log(this.signupForm.value)
    this.auth.signupUser(this.signupForm.value.fname,this.signupForm.value.lname,this.signupForm.value.email,this.signupForm.value.password)
}
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('',  Validators.required),
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
      
    })
  }

  goToLogin(){
    this.router.navigate(['users/login'])
  }
}
