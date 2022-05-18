import { RoleGuard } from './role.guard';
import { AuthService } from 'src/app/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { UserRoutingModule } from './user/user-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignupComponent } from './user/components/signup/signup.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BookComponent } from './main/book/book.component';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './adminuser/location/location.component';
import { MovieComponent } from './adminuser/movie/movie.component';
import { CinemaComponent } from './adminuser/cinema/cinema.component';
import { ShowComponent } from './adminuser/show/show.component';
import { SelectComponent } from './main/select/select.component';
import { SeatsComponent } from './main/seats/seats.component'
import {MatIconModule} from '@angular/material/icon';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatFormFieldModule} from '@angular/material/form-field'
import{ MatInputModule} from '@angular/material/input'
import{MatButtonModule} from '@angular/material/button'
import { MatPaginator } from '@angular/material/paginator';
import{MatDatepickerModule} from '@angular/material/datepicker'
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import{MatToolbarModule} from '@angular/material/toolbar'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AdminComponent,
    LocationComponent,
    MovieComponent,
    CinemaComponent,
    ShowComponent,
    SelectComponent,
    SeatsComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    AuthGuard, AuthService, RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
