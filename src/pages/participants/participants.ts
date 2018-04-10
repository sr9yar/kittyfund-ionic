import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ParticipantClass } from '../../classes/participant';

import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { Login } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class Participants {

	public fund: any;
	public searchTerm: any;

  constructor(
		private navParams: NavParams, 
		public alert: AlertController,
		private user: UserService, 
		private api: ApiService, 
		private navCtrl: NavController
	){
		this.fund = this.navParams.get('fund');
  }
    
	ionViewCanEnter(): boolean {
		if(!this.user.auth()){
			this.navCtrl.setRoot(Login);
		} else {
			return this.user.auth();
		}
	}
  
  	onSubmit = function() {
		this.api.FundsPut(this.fund).subscribe(res => {
		}); 
	};
	
	
  	back = function() {
		this.navCtrl.pop();
	}

	remove = function(index) {
		
		let prompt = this.alert.create({
		  title: 'Remove?',
		  message: "Are you sure you want to remove this participant?",
		  buttons: [
			{
			  text: 'Cancel',
			  handler: data => {
			  }
			},
			{
			  text: 'Remove',
			  handler: data => {
				this.removeParticipant(index);
			  }
			}
		  ]
		});
		prompt.present();

	}

	addParticipant = function() {

		this.fund.people.unshift( new ParticipantClass() );
		this.fund.expected = Math.ceil(Number(this.fund.goal) / this.fund.people.length);
		
		this.api.FundsPut(this.fund).subscribe(res => {
		}); 

	}
	
	
	trackParticipant = function(index, item) {
		return index;
	}


	removeParticipant = function(i) {
		this.fund.people.splice( i, 1 );
		
		this.fund.expected = Math.ceil(Number(this.fund.goal) / this.fund.people.length);
		this.recalcLeft();
		
		this.api.FundsPut(this.fund).subscribe(res => {
		});
	}

	
	
	recalcLeft= function(){

		let i;
		let deposited = 0;
		for(i=0;i<this.fund.people.length;i++){
			
			if( Number(this.fund.people[i].deposited) < Number(this.fund.expected) ){
				this.fund.people[i].left = Number(this.fund.expected)-Number(this.fund.people[i].deposited);
			} else {
				this.fund.people[i].left = 0;
			}
			
			
			deposited += Number(this.fund.people[i].deposited);
		}
		if(deposited < Number(this.fund.goal) ){
			this.fund.left = Number(this.fund.goal) - deposited;
		} else {
			this.fund.left = 0;
		}
		this.fund.deposited = deposited;

		this.fund.available = deposited - Number(this.fund.spent);

	};

	
	
	getFilteredList = function() {
		if (!!this.searchTerm) {
			return this.fund.people.filter(
				e=>{
					return e.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1 || e.phone.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
				}
			);
		}else{
			return this.fund.people;
		}
		
	}
}
