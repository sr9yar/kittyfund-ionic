import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Lists } from './lists';


// export function createTranslateLoader(http: HttpClient) {
    // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    Lists
  ],
  imports: [
    IonicPageModule.forChild(Lists),
    TranslateModule.forChild()
  ],
  entryComponents: [
    Lists
  ]
})

export class ListsModule {}