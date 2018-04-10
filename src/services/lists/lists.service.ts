import { Injectable } from '@angular/core';

@Injectable()
export class ListsService {
	public data:any;
	
  constructor() { 
	this.data = []; 
  }

}
