import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // this activated route will help us to fetch ids from the url.

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit {
  id: any
  public model: any = {};
  constructor(
    private _apiService: ApiService, 
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this._apiService.book_detail(this.id).subscribe(data=>{
      this.model = data['books']['0']
    },
    error => {
      if(error.status == 401){
        this.toastr.error("Token expired", "Error");
        this.router.navigate(['/login']);
      }
    });
  }

  updateBook(){
    this._apiService.edit_detail(this.id, this.model).subscribe(data=>{
      this.toastr.success(data['message'], "Success");
      this.router.navigate['/books'];
    },
    error=>{
      console.log(error.error.error.path);
      if(error.error.error.code){
        this.toastr.error("Book with this name already exists!", "Error");
      }else if(error.error.error.path == "price"){
        this.toastr.error("Price should be a number!", "Error");
      }else if(error.error.error.path == "isbn"){
        this.toastr.error("ISBN should be a number!", "Error");
      }else{
        this.toastr.error("Auth error!", "Error");
        this.router.navigate(['/login']);
      }
    });
  }
}
