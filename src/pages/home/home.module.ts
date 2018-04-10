import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Home } from './home';

@NgModule({
  declarations: [
    Home
  ],
  imports: [
    IonicPageModule.forChild(Home),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Home
  ]
})

export class HomeModule {}