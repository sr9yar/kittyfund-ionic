import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';


import { ConfigService } from '../../services/config/config.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';

import { Home } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

	public data:any;

	constructor(
		public navCtrl: NavController,
		public alert: AlertController,
		private api:ApiService,
		private user:UserService,
		private config:ConfigService
	){

		this.data = {email:'tester',password:'123'};

	}
	
	ionViewCanEnter(): boolean {
		if(this.user.auth()){
			this.navCtrl.setRoot(Home);
		  } else {
			  return !this.user.auth();
		  }
	}

  onSubmit(){
	  
	  if(!this.data.email){
		  
		let prompt = this.alert.create({
		  title: 'Login',
		  message: "Please, enter your email.",
		  buttons: [
			{
			  text: 'OK'
			}
		  ]
		});
		prompt.present();
		
	  } else if (!this.data.password) {
		  
		let prompt = this.alert.create({
		  title: 'Password',
		  message: "Please, enter your password.",
		  buttons: [
			{ text: 'OK'
			}
		  ]
		});
		prompt.present();
		
	  } else {
		this.api.Login(this.data).subscribe(res => {

			this.user.setUserData(res);
			if(this.navCtrl.length > 0) {
				this.navCtrl.pop();
			}else {
				this.navCtrl.setRoot(Home);
			}

		},res => {
			
			let prompt = this.alert.create({
			  title: 'Error',
			  message: res.message || '',
			  buttons: [
				{
				  text: 'OK'
				}
			  ]
			});
			prompt.present();
			
		}); 
	  }

  }


}
