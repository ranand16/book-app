import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable,of } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{ 
intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token'); //get token from local 
        req = req.clone({headers: req.headers.set('Authorization', 'JWT'+token)}); //cloning the request and addinng Authorization header to it
        return next.handle(req);// passing the request
    }
}
