import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEntryModule } from '@ampath-kenya/ngx-formentry';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import * as ngTranslateLoader from '@ngx-translate/http-loader';
//import {TranslateHttpLoader} from '@ngx-translate/http-loader';
//import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import  * as ngTranslate from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

class CustomLoader implements ngTranslate.TranslateLoader {
    getTranslation(lang: string): any {
        return of({"Provider:": 'Provider 2:'});
    }
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormEntryModule,
    HttpClientModule,
    ReactiveFormsModule,
    ngTranslate.TranslateModule.forRoot({
            loader: {
                provide: ngTranslate.TranslateLoader,
                useClass: CustomLoader,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
