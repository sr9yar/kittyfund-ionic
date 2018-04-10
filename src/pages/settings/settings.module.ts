import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Settings } from './settings';

@NgModule({
  declarations: [
    Settings
  ],
  imports: [
    IonicPageModule.forChild(Settings),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Settings
  ]
})

export class SettingsModule {}