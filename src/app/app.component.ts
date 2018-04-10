import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { Funds } from '../pages/funds/funds';
import { Lists } from '../pages/lists/lists';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';

import { Home } from '../pages/home/home';
import { UserService } from '../services/user/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = Home;
	
  constructor(
		platform: Platform, 
		translate: TranslateService,
		user: UserService,
		statusBar: StatusBar, 
		splashScreen: SplashScreen
  ){

	translate.setDefaultLang('en');
	translate.use(user.getUserLanguage());
		
	platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Home);
  }goToFunds(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Funds);
  }goToLists(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Lists);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Profile);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Settings);
  }
  
  
}
