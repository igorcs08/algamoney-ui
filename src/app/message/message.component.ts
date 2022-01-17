import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <!-- <p-message *ngIf="temErro()" severity="error" text="{{ text }}"></p-message> -->
  `,
  styles: [`
  .p-message-error {
    padding: 3px;
  }
  `
  ]
})
export class MessageComponent {
  @Input() error: string = '';
  @Input() control: FormControl = new FormControl;
  @Input() text: string = '';

  temErro(): boolean {
    return this.control.dirty && this.control.hasError(this.error);
  }

}
