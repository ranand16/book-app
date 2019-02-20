import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// importing forms module to use ngForm
import { FormsModule } from '@angular/forms';
// importing app-routing.module.ts
import { AppRoutingModule } from './app-routing.module';
// importing the http client module and http interceptors to use http client 
// for making API calls and intercepting the calls
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// importing the interceptor which will intercept each api call and attach
// token in header
import { HeaderInterceptor } from './interceptors/header-interceptor';
//services 
import { ApiService } from './services/api.service';
//for using ngx toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './templates/login/login.component';
import { SignupComponent } from './templates/signup/signup.component';
import { BooksComponent } from './templates/books/books.component';
import { AddBooksComponent } from './templates/add-books/add-books.component';
import { EditBooksComponent } from './templates/edit-books/edit-books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    AddBooksComponent,
    EditBooksComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
