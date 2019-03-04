import { Injectable } from '@angular/core';
// importing lib for HTTP calls
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpCLient: HttpClient) { }

  login(model:any){
    return this.httpCLient.post('http://127.0.0.1:3000/userapi/login', model);
  } 
  signup(model:any){
    return this.httpCLient.post('http://127.0.0.1:3000/userapi/signup' , model);
  } 
  addNewBook(model:any){
    return this.httpCLient.post('http://127.0.0.1:3000/bookapi/add-book', model);
  }

  getBooks(){ 
    return this.httpCLient.get('http://127.0.0.1:3000/bookapi/all-books/');
  }

  del_book(id: any){
    return this.httpCLient.delete('http://127.0.0.1:3000/bookapi/delete-book/'+id);
  }

  book_detail(id: any){
    return this.httpCLient.get('http://127.0.0.1:3000/bookapi/book-details/'+id);
  }

  edit_detail(id: any, model:any){
    return this.httpCLient.patch('http://127.0.0.1:3000/bookapi/update-book/'+id, model);
  }

} 
