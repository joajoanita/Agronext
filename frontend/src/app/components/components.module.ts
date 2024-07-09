import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    NavbarComponent,
    BlogPostComponent,
    FooterComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    NavbarComponent,
    BlogPostComponent
  ]
})
export class ComponentsModule { }
