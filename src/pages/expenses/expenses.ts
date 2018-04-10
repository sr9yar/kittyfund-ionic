import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpenseClass } from '../../classes/expense';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';

import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class Expenses {
	
	public fund: any;
	public searchTerm: any;
	
  constructor(
				private navParams: NavParams, 
				public alertCtrl: AlertController,
				private user: UserService,
				private navCtrl: NavController,
				private api: ApiService 
			){
	
	this.fund = this.navParams.get('fund')
	
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
	}

	back = function() {
		this.navCtrl.pop();
	}

	getFilteredList = function() {
		if (!!this.searchTerm) {
			return this.fund.expenses.filter(
				e=>{
					return e.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
				}
			);
		}else {
			return this.fund.expenses;
		}
		
	}

	
	remove = function(index) {
		
		let prompt = this.alertCtrl.create({
		  title: 'Remove?',
		  message: "Are you sure you want to remove this expense?",
		  buttons: [
			{
			  text: 'Cancel',
			  handler: data => {

			  }
			},
			{
			  text: 'Remove',
			  handler: data => {
				this.removeExpense(index);
			  }
			}
		  ]
		});
		prompt.present();

	}

	addExpense = function() {

		this.fund.expenses.unshift( new ExpenseClass() );

		this.api.FundsPut(this.fund).subscribe(res => {
			console.log('FundsPut addExpense', res);
		}); 

	}
	
	
	
	trackExpense = function(index, item) {
		return index;
	}


	removeExpense = function(i) {
		this.fund.expenses.splice( i, 1 );
		this.recalcExpenses();
		
		this.api.FundsPut(this.fund).subscribe(res => {
			console.log('ListsPut removeExpense', res);
		});
	}
	
	
	
	
	recalcExpenses = function(){

		let i;
		let spent = 0;
		for(i=0;i<this.fund.expenses.length;i++){
			spent += Number(this.fund.expenses[i].sum);
		}

		this.fund.available = Math.ceil(Number(this.fund.deposited) - spent);
		this.fund.spent = Math.ceil(spent);

	};
}
