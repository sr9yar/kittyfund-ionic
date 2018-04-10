import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';


@Injectable()
export class ApiService {

	constructor(
			private config: ConfigService, 
			private http: HttpClient
		){ 

	}



	FundsAll = function():Observable<any> {

		let data = {
		  'page':1
		};

		let url = '/funds/all';
		
		return this.http
			.post(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
		
	};


	Login = function(data):Observable<any> {
		
		if(typeof data === 'undefined'){
			let data = 	{
				'login':'tester',
				'password':'123'
			};
		}
		
		let url = '/login';

		return this.http
			.post(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};


	FundsPut = function(data):Observable<any> {
	
		let url = '/funds/'+data._id;

		return this.http
			.put(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};	
	 

	ListsPut = function(data):Observable<any> {
		let url = '/lists/'+data._id;

		return this.http
			.put(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};	

	
	
	ListsDelete = function(data):Observable<any> {
		let url = '/lists/'+data._id;

		return this.http
			.delete(this.config.URL.Base + this.config.URL.API + url)
			.pipe( retry(3) );
	};	
	
	
	FundsDelete = function(data):Observable<any> {
		let url = '/funds/'+data._id;

		return this.http
			.delete(this.config.URL.Base + this.config.URL.API + url)
			.pipe( retry(3) );
	};	




	ListsCreate = function(data):Observable<any> {
		let url = '/lists/create';

		return this.http
			.post(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};

	FundsCreate = function(data):Observable<any> {
		let url = '/funds/create';

		return this.http
			.post(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};	


	ListsAll = function():Observable<any> {

		let data = { 'page':1 };
		let url = '/lists/all';
		
		return this.http
			.post(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
		
	};
	
	

	UsersPut = function(data):Observable<any> {
		let url = '/users/'+data._id;

		return this.http
			.put(this.config.URL.Base + this.config.URL.API + url, data)
			.pipe( retry(3) );
	};	

	
}
