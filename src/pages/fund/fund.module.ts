import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Fund } from './fund';

@NgModule({
  declarations: [
    Fund
  ],
  imports: [
    IonicPageModule.forChild(Fund),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Fund
  ]
})

export class FundModule {}