import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController  } from 'ionic-angular';

import { ApiService } from '../../services/api/api.service';
import { FundsService } from '../../services/funds/funds.service';
import { UserService } from '../../services/user/user.service';

import { Fund } from '../fund/fund';
import { Login } from '../login/login';

import { FundClass } from '../../classes/fund';

@IonicPage()
@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html'
  
})
export class Funds implements OnInit {

	public activeOnlyEnabled:any;
  constructor(
	public navCtrl: NavController, 
		  public loadingCtrl: LoadingController, 
		  private user: UserService,
	private funds: FundsService, 
	private api: ApiService
	) {
	
	this.activeOnlyEnabled = true;

  }
  
  ngOnInit() { 

	  if(typeof this.funds.data === "undefined" || this.funds.data.length ==  0){

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
		 this.api.FundsAll().subscribe(res => {

			 this.funds.data = res.data; 

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
  
  
	getFunds = function(){ 
		if(typeof this.funds.data !== "undefined"){
			if(this.activeOnlyEnabled ){
				return this.funds.data.filter( fund => fund.active == 1 );
			}else{
				return this.funds.data;
			}
		}
	}


	openFund = function(fund) {
		this.navCtrl.push(Fund, {fund:fund});
	}



	addFund = function() {
		this.api.FundsCreate( new FundClass() ).subscribe(res => {
			this.funds.data.unshift(res);
		}); 
	}


}
