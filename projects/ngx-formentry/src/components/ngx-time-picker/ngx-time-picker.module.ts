import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTimePickerComponent } from './ngx-time-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [NgxTimePickerComponent],
  exports: [NgxTimePickerComponent],
  providers: []
})
export class NgxTimePickerModule {}
