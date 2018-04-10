import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Expenses } from './expenses';

@NgModule({
  declarations: [
    Expenses
  ],
  imports: [
    IonicPageModule.forChild(Expenses),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Expenses
  ]
})

export class ExpensesModule {}