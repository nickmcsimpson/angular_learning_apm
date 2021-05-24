import { NgModule } from '@angular/core';

import { MessageComponent } from './message.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: 'messages',
      component: MessageComponent,
      outlet: 'popup'
    }])
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
