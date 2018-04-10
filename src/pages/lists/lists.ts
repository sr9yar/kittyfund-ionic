import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api.service';
import { ListsService } from '../../services/lists/lists.service';
import { UserService } from '../../services/user/user.service';

import { List } from '../list/list';
import { Login } from '../login/login';

import { ListClass } from '../../classes/list';


@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class Lists implements OnInit {
	
	public activeOnlyEnabled:any;
	
  constructor(
	  public navCtrl: NavController, 
	  public loadingCtrl: LoadingController, 
	  private lists: ListsService, 
	  private user: UserService,
	  public translate: TranslateService,
	  private api: ApiService
  ) {

	this.activeOnlyEnabled = true;

	}
  
    ngOnInit() { 

		if(typeof this.lists.data === "undefined" || this.lists.data.length ==  0){
			
		let loadingStr = 'Please, wait...';
		if(this.user.getUserLanguage() == 'ru'){
			loadingStr = 'Пожалуйста, подождите...';
		}
		
				
				let loading = this.loadingCtrl.create({
					enableBackdropDismiss: true,
				   content: loadingStr,
				spinner: 'bubbles'
			  });

			
			loading.present();
			this.api.ListsAll().subscribe(res => {

				this.lists.data = res.data; 
				loading.dismiss();
			}); 


		} 

	}

	ionViewCanEnter(): boolean {
			if(!this.user.auth()){
			this.navCtrl.setRoot(Login);
		  } else {
			return this.user.auth();
		  }
	
	}
	
	
  switchActive = function(){
	this.activeOnlyEnabled = !this.activeOnlyEnabled;
  }

 	openList = function(list) {
		this.navCtrl.push(List, {list:list});
	}
	
	
	getLists = function(){ 
	  if(this.activeOnlyEnabled && 		typeof this.lists.data !== "undefined" ){
		   return this.lists.data.filter( list => list.active == 1 );
	  }else{
		  return this.lists.data;
	  }
	  
  }
  
	addList = function() {
		
		// add a check later 
		if(typeof this.lists.data !== "undefined" ){
			this.api.ListsCreate(new ListClass()).subscribe(res => {
				this.lists.data.unshift(res);
			}); 
			
		}
	}

}
