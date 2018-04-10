import { Injectable } from '@angular/core';

import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

import { ConfigService } from '../config/config.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserService {

	@LocalStorage()
	public data: any;
	public key: string = 'kittyfund';

	constructor(
		private storage:LocalStorageService,
		private translate: TranslateService,
		private config:ConfigService
	){ 
  
		this.data = this.storage.retrieve(this.key);
	}

	getAuthorizationHeader = function():string{
		return this.data.authorization || '';
	}

	getToken = function():string{

		if(this.data) {
			return this.data.token || '';
		} else {
			return '';
		}
	}

    setUserData = function(d) {
	  this.data = d;
      this.storage.store(this.key, d);
    }
	
    setUser = function(d) {
	  this.data.user = d;
      this.storage.store(this.key, this.data);
    }

    auth = function() {
		
		if(!!this.data) {
			return !!this.data.token;
		} else {
			return false;
		}

    }
	
	logout = function() {
		 this.clearUserData();
		 this.data = {user:{settings:{}}};
	}
	 
	clearUserData = function() {
		this.storage.clear(this.key);
    }

	
	getUserLanguage = function() {
		if(this.data !== null){
			return this.data.user.settings.language || 'ru';
		}else{
			return 'ru';
		}
		
	}
}
