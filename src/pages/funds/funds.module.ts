import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Funds } from './funds';

@NgModule({
  declarations: [
    Funds
  ],
  imports: [
    IonicPageModule.forChild(Funds),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Funds
  ]
})

export class FundsModule {}