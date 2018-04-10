import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';

import { TranslateService } from '@ngx-translate/core';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
	public language:any;
	
  constructor(
	public navCtrl: NavController,
	public translate: TranslateService,
	public loadingCtrl: LoadingController, 
	public user: UserService,
	private api: ApiService
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
  
	changeLanguageEvent = function(){
		this.translate.use(this.user.getUserLanguage());
	}

}
