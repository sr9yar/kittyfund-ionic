import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Ng2Webstorage } from 'ngx-webstorage';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfigService } from '../services/config/config.service';
import { UserService } from '../services/user/user.service';
import { ApiService } from '../services/api/api.service';

import { FundsService } from '../services/funds/funds.service';
import { ListsService } from '../services/lists/lists.service';


import { MyApp } from './app.component';
import { Home } from '../pages/home/home';

import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';
import { Lists } from '../pages/lists/lists';
import { Funds } from '../pages/funds/funds';
import { List } from '../pages/list/list';
import { Participants } from '../pages/participants/participants';
import { Expenses } from '../pages/expenses/expenses';
import { Fund } from '../pages/fund/fund';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomeModule } from '../pages/home/home.module';
import { LoginModule } from '../pages/login/login.module';
import { ProfileModule } from '../pages/profile/profile.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { ListsModule } from '../pages/lists/lists.module';
import { FundsModule } from '../pages/funds/funds.module';
import { ListModule } from '../pages/list/list.module';
import { ParticipantsModule } from '../pages/participants/participants.module';
import { ExpensesModule } from '../pages/expenses/expenses.module';
import { FundModule } from '../pages/fund/fund.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
	MyApp
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	Ng2Webstorage,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [HttpClient]
		}
	}),

	HomeModule,
	LoginModule,
	ProfileModule,
	SettingsModule,
	ListsModule,
	FundsModule,
	ListModule,
	ParticipantsModule,
	ExpensesModule,
	FundModule,

    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [
	IonicApp
  ],
  entryComponents: [

    Login,
    Profile,
    Settings,
    Lists,
    Funds,
    List,
    Participants,
    Expenses,
    Fund,
	
    Home,
	MyApp
  ],
  providers: [
	UserService,
	ConfigService,
	ApiService,
  	{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	ListsService,
	FundsService,
	StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}