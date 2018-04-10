import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	
	public URL:any;

  constructor() { 
     this.URL = {
		API:'/api/v1',
		Base:'https://tula.pw',
	};
 
  }

}
