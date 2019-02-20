import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

//all components
import { LoginComponent } from './templates/login/login.component';
import { SignupComponent } from './templates/signup/signup.component';
import { BooksComponent } from './templates/books/books.component';
import { AddBooksComponent } from './templates/add-books/add-books.component';
import { EditBooksComponent } from './templates/edit-books/edit-books.component';

// path 
const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'books', component: BooksComponent},
    {path: 'all-books', component: BooksComponent},
    {path: 'add-books', component: AddBooksComponent},
    {path: 'edit-books/:id', component: EditBooksComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
