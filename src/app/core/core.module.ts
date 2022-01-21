import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import localePt from '@angular/common/locales/pt';
import { ErrorHandlerService } from './service/error-handler.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ErrorHandlerService
  ]
})
export class CoreModule { }
