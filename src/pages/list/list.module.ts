import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { List } from './list';

@NgModule({
  declarations: [
    List
  ],
  imports: [
    IonicPageModule.forChild(List),
    TranslateModule.forChild()
  ],
  entryComponents: [
    List
  ]
})

export class ListModule {}