import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	
		public user:any;
  
	  constructor( private injector: Injector ) {

	  }
	  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.user = this.injector.get(UserService);
	   
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer '+this.user.getToken(),
      }
    });
	  
    return next.handle(req);
  }
}
