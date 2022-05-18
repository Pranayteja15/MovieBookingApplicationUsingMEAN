import { Router } from '@angular/router';
import { Component, OnInit,  EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  id!:string
  private refresh!: EventEmitter<void>;
  seats:any=[]
  seatAvailable!:any
  reservedSeats!:any
  reservedSeatsList:any=[]
  selected:any=[]
  total:any=0
  rows:any=[]


    /**
   * used to select seat whenever user clicks on seat
   */
     public seatSelect(seatNo: number,row:number,col:number) {
      this.toggleSeatSelect(seatNo,row,col);
  
    }

    public checkSeatStatus(seatNum: number,row:number,col:number) {
      if (this.rows[row][col]==1) {
      
       return false
      }
      return true;
  
    }

    public isSeatReserved(seatNum: number,row:number,col:number) {
      if (this.seats[row][col]==-1) {
       
        
          return true
        
       }
      
      return false;
  
    }
  
    /** Used to togle seat selection on click */
    public toggleSeatSelect(seatNo: number,row:number,col:number) {
     
      if(seatNo){
        this.rows[row][col]=0
      }
      else{
        this.rows[row][col]=1
      }
    }

    openDialog(){
      let i:any=0
      let a:any=0
      while ( i < this.seats.length){
      let j:any=0
      while(j < this.seats[i].length){
        if(this.seats[i][j]==1){
          this.selected.push([i,j])
        }
        if(this.seats[i][j]==-1){
          a+=1
        }
        j+=1
      }

      i+=1
    }
    if(this.selected.length==0){
      alert('please select seats')
    }
    if(a!=this.reservedSeats){
      alert('error seats, please dont select reserved seats, try again')
    }
    else{
      this.auth.setSelected(this.selected)
      this.auth.set_showId(this.id)
      this.router.navigateByUrl('/final/confirm');
      
   
    }
    }

  ngOnInit(): void {
    this.id=this.auth.get_showId()

    this.auth.getShowbyId(this.id)
    .subscribe({
          next: (res) => {
            
            this.seats=res.seats
            
            let i:any=0
            while ( i < this.seats.length){
              let j:any=0
              while(j < this.seats[i].length){
                
                if(this.seats[i][j]==1){
                  this.seats[i][j]=-1
                  this.reservedSeatsList.push([i,j])
                }
                this.total+=1
                j+=1
              }

              i+=1
            }
            this.rows=res.seats
            this.seatAvailable=res.seatsAvailable
            this.reservedSeats=this.total-this.seatAvailable
            
          },
          error: (err) => { console.log(err) 
            alert("invalid details")}
        })
  }

  

}
