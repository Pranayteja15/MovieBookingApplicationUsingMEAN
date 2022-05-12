import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private auth:AuthService,private formBuilder: FormBuilder, private router:Router) { }

  form:any = FormGroup;
  result:any=[]
  showIdList:any=[]
  title!:string
  city!:string

  show(){
    console.log()
  }

  get f(){
    return this.form.controls;
  }
  
  submit(){
    let id:string=this.form.value.show
    this.auth.set_showId(this.form.value.show)
    this.router.navigateByUrl('/seats');
    // this.auth.getShowbyId(id)
    // .subscribe({
    //       next: (res) => {
    //         console.log('success',res)
    //         // alert("detail")
    //         // this.router.navigate(['book'])
    //       },
    //       error: (err) => { console.log(err) 
    //         alert("invalid details")}
    //     })
    console.log(this.form.value);
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      show: ['',Validators.required],
      // password:['',Validators.required],
      // email:['',Validators.compose([Validators.required,Validators.email])]
    })

        this.title=this.auth.get_title()
        this.city=this.auth.get_city()
        this.auth.displayshows(this.auth.get_city(),this.auth.get_title())
    .subscribe({
          next: (res) => {
            
            for(let item of res){
              this.showIdList.push(item.id)
            }
            this.result=res
            // console.log('success',this.result,this.showIdList)
            // alert("detail")
            // this.router.navigate(['book'])
          },
          error: (err) => { console.log(err) 
            alert("invalid details")}
        })
  }

}
