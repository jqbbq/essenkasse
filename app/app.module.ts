import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import { ModalModule }          from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { UserService }          from './user.service';

import { AppComponent }         from './app.component';
import { UsersComponent }       from './users.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    AppComponent,
    UsersComponent
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
