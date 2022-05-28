import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

const routes: Routes = [
    { path: 'register', component: RegisterFormComponent },
    //La route vide est associée à la page de connexion
    { path: "", component: LoginFormComponent },
    { path: "home", component: HomeComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}