import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Login } from './login';

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    IonicPageModule.forChild(Login),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Login
  ]
})

export class LoginModule {}