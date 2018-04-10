import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Participants } from '../participants/participants';
import { Expenses } from '../expenses/expenses';

import { FundsService } from '../../services/funds/funds.service';
import { UserService } from '../../services/user/user.service';

import { ApiService } from '../../services/api/api.service';
import { Toast } from '@ionic-native/toast';

import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-fund',
  providers: [
	Toast
  ],
  templateUrl: 'fund.html'
})

export class Fund implements OnInit  {
	public fund: any;
	
  constructor(	  
				  private navCtrl: NavController, 
				  private navParams: NavParams, 
				  private api: ApiService, 
				  private user: UserService,
				  private toast: Toast,
				  private platform: Platform,
				  private funds: FundsService
				){

	  this.fund = this.navParams.get('fund');
	  
  }
  
    ngOnInit() { 
	
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

		this.api.FundsPut(this.fund).subscribe(res => {

			if (this.platform.is('cordova')) {
				
      			this.toast.show('Fund saved', '2000', 'bottom').subscribe(
				  toast => {

				  }
				);

			} else {

			}
		}); 
	}
	
	
	onDelete = function() {

		this.api.FundsDelete(this.fund).subscribe(res => {
			for (var i=0; i < this.funds.data.length; i++) {
				if(this.funds.data[i]._id == res._id){
					this.funds.data.splice(i, 1);
					break;
				}
			}
			
			this.navCtrl.pop();

		}); 
	}


	
	
	GoToParticipants = function(fund) {
		this.navCtrl.push(Participants, {fund:fund});
	}

	GoToExpenses = function(fund) {
		this.navCtrl.push(Expenses, {fund:fund});
	}


	recalcExpected = function(){
		
		this.fund.available = this.fund.deposited - Number(this.fund.spent);
		this.fund.expected = Math.ceil(Number(this.fund.goal) / this.fund.people.length);
	};


	
	
	
}
