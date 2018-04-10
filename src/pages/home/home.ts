import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Funds } from '../funds/funds';
import { Lists } from '../lists/lists';
import { Login } from '../login/login';

import { UserService } from '../../services/user/user.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(
	public navCtrl: NavController,
			private user: UserService
  ) {
  }
  
    ionViewCanEnter(): boolean {
		if(!this.user.auth()){
			this.navCtrl.setRoot(Login);
		} else {
			return this.user.auth();
		}
	}
	
  goToFunds(params){
    if (!params) params = {};
    this.navCtrl.push(Funds);
  }
  goToLists(params){
    if (!params) params = {};
    this.navCtrl.push(Lists);
  }
}
