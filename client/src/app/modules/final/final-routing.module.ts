import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {
    path:'confirm',component:ConfirmComponent,canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalRoutingModule { }
