import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  user_type;
  bookList: any = [];
  constructor(
    private _apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = ()=>{ return false;}
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.user_type = localStorage.getItem('user_type');
    if(!token){
      this.router.navigate(['/login']);
    }
    this._apiService.getBooks().subscribe(data => {
      this.bookList = data["books"]
    },
    error => {
      this.toastr.error(error.error.message, "Error");
      this.router.navigate(['/login']);
    });
  }

  deleteBook(id: any){
    if(this.user_type == 'admin') {
      this._apiService.del_book(id).subscribe(data=>{
        console.log(data);
        this.router.navigated = false;
      },
      error=>{
        console.log(error);
      }); 
    } else {
      this.toastr.error("you are not an admin!!", "Error");
    }
  }

  logout(id: any){
    localStorage.removeItem('user_type');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
