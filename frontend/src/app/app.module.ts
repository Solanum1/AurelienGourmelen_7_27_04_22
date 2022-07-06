import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
//import { HttpInterceptorProviders } from './interceptors';
import { JwtModule } from "@auth0/angular-jwt";
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditPostFormComponent } from './edit-post-form/edit-post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterFormComponent,
    LoginFormComponent,
    HomeComponent,
    NewPostComponent,
    SinglePostComponent,
    EditPostComponent,
    EditPostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    //RegisterFormComponent,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("auth_tkn");
        },
        throwNoTokenError: true,
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: ["http://localhost:3000/api/auth", "http://localhost:3000/api/auth/login", "http://localhost:3000/api/auth/signup"]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
    // HttpInterceptorProviders
    //RegisterFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}
