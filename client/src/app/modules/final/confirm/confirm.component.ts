
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private auth:AuthService) { }
  selected:any
  id!:string
  result:any={}

  ngOnInit(): void {
    this.selected=this.auth.getSelected()
    this.id=this.auth.get_showId()
    // console.log(this.selected)

     this.auth.book(this.id,this.selected)
      .subscribe({
        next:(res)=>{
          this.result=res
          console.log(this.result)
        },
        error: (err) => { console.log(err) 
          alert("invalid details")}
      })
  }

}
