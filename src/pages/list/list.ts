import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, Platform } from 'ionic-angular';

import { Participants } from '../participants/participants';
import { Expenses } from '../expenses/expenses';

import { ListsService } from '../../services/lists/lists.service';
import { FundsService } from '../../services/funds/funds.service';

import { UserService } from '../../services/user/user.service';

import { ApiService } from '../../services/api/api.service';
import { Toast } from '@ionic-native/toast';

import { Funds } from '../funds/funds';
import { Fund } from '../fund/fund';

import { Login } from '../login/login';

import { ParticipantClass } from '../../classes/participant';

@IonicPage()
@Component({
  selector: 'page-list',
    providers: [
	Toast
  ],
  templateUrl: 'list.html'
})

export class List {
	
	public list:any;

  constructor(
				private navCtrl: NavController, 
				private navParams: NavParams, 
				private api: ApiService, 
				private user: UserService,
				private toast: Toast,
				private platform: Platform,
				private funds: FundsService,
				private lists: ListsService
			){
				
		this.list = this.navParams.get('list');
  }
    
	ionViewCanEnter(): boolean {
		if(!this.user.auth()){
			this.navCtrl.setRoot(Login);
		} else {
			return this.user.auth();
		}
	}
	
    back = function() {
		this.navCtrl.pop();
	}
  
  	onSubmit = function() {
		this.api.ListsPut(this.list).subscribe(res => {
			
			if (this.platform.is('cordova')) {
				
      			this.toast.show('List saved', '2000', 'bottom').subscribe(
				  toast => {
				  }
				);
			} else {
			}

		}); 
	}


	onDelete = function() {
		this.api.ListsDelete(this.list).subscribe(res => {
		for (var i=0; i < this.lists.data.length; i++) {
			if(this.lists.data[i]._id == res._id){
				this.lists.data.splice(i, 1);
				break;
			}
		}
		
		this.navCtrl.pop();
		}); 
		

	}


  	createFund = function() {
		
		this.api.ListsPut(this.list).subscribe(res => {
			delete res._id;
			this.api.FundsCreate(res).subscribe(res2 => {
				if(typeof this.funds.data !== "undefined" && this.funds.data.length > 0){
					this.funds.data.unshift(res2);
				}
				this.navCtrl.insertPages(this.navCtrl.length(), [{page:Funds},{page:Fund, params:{fund:res2}}])
			}, error2 => {
			}); 
		}); 


	}


	addParticipant = function() {
		this.list.people.unshift( new ParticipantClass() );

		this.api.ListsPut(this.list).subscribe(res => {
		}); 

	}

	trackParticipant = function(index, item) {
		return index;
	}


	
	removeParticipant = function(i) {
		
		this.list.people.splice( i, 1 );
		
		this.api.ListsPut(this.list).subscribe(res => {
		});
	}


}
