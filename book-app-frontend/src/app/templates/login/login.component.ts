import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: any = {};
  constructor(
    private _apiService: ApiService, 
    private toastr: ToastrService, 
    private router: Router) { }

  ngOnInit() {
  }

  signin(){
    this._apiService.login(this.model).subscribe(data=>{
      //check response
      if(data["message"] === "Auth Successful"){
        console.log("data: "+ data);
        this.toastr.success(data["message"], "success");
        localStorage.setItem("user_type", data['user_type']);
        localStorage.setItem("token", data['token']);
        this.router.navigate(['/books']);
      }
    }, error=>{
      this.toastr.error(error.error.message, "Error ");
    });
  }


}
