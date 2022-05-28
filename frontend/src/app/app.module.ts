import { NgModule } from '@angular/core';
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
import { AllPostsComponent } from './all-posts/all-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterFormComponent,
    LoginFormComponent,
    HomeComponent,
    NewPostComponent,
    AllPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: ["http://localhost:3000/api/auth"],
      },
    }),
  ],
  providers: [
    //HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
