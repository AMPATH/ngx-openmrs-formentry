import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
import * as ngTranslate from '@ngx-translate/core';
@NgModule({
  declarations: [SecurePipe],
  imports: [CommonModule],
  exports: [SecurePipe, ngTranslate.TranslateModule],
  providers: [DataSources]
})
export class SharedModule {}
