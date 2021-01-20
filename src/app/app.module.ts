import { RouterModule } from '@angular/router';
import { routes } from './app.router';
import { AuthpanelModule } from './authpanel/authpanel.module';
import { MainpanelModule } from './mainpanel/mainpanel.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpanelComponent } from './mainpanel/mainpanel.component';
import { AuthpanelComponent } from './authpanel/authpanel.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService} from '../app/services/interceptor.service';
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import{BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { 
  OwlDateTimeModule, 
  OwlNativeDateTimeModule,
  
} from 'ng-pick-datetime';
@NgModule({
  declarations: [
    AppComponent,
    MainpanelComponent,
    AuthpanelComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AuthpanelModule,
    MainpanelModule,
    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
