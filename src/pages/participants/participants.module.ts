import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Participants } from './participants';

@NgModule({
  declarations: [
    Participants
  ],
  imports: [
    IonicPageModule.forChild(Participants),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Participants
  ]
})

export class ParticipantsModule {}