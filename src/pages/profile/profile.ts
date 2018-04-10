import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { ConfigService } from '../../services/config/config.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';

import { Home } from '../home/home';
import { Login } from '../login/login';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class Profile {
  constructor(
		private navCtrl: NavController,
		public loadingCtrl: LoadingController, 
  		private api:ApiService, 
		public user:UserService,
		private config:ConfigService
	){
  }
  
  	ionViewCanEnter(): boolean {
		if(!this.user.auth()){
			this.navCtrl.setRoot(Login);
		} else {
			return this.user.auth();
		}
	}

	onSubmit = function(){
  		let loadingStr = 'Please, wait...';
		if(this.user.data.user.settings.language == 'ru'){
			loadingStr = 'Пожалуйста, подождите...';
		}
		
		let loading = this.loadingCtrl.create({
			enableBackdropDismiss: true,
			content: loadingStr,
			spinner: 'bubbles'
		});
		
		loading.present();
		this.api.UsersPut(this.user.data.user).subscribe(res => {
			this.user.setUser(res);
			loading.dismiss();
		}); 
	} 
  
	logout = function(){
		this.user.logout();
		this.navCtrl.setRoot(Login);
	}
}
