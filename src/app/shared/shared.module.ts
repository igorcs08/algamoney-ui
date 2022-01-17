import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message/message.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
