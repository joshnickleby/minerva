import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import {HTTP_INTERCEPTOR_PROVIDERS} from './interceptors'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
