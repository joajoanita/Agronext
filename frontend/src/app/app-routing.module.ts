import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './views/home/home.component';
import { BlogComponent } from './views/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogViewDetailComponent } from './views/blog-view-detail/blog-view-detail.component';
import { UsComponent } from './views/us/us.component';
import { ServicesComponent } from './views/services/services.component';
import { SoftwareComponent } from './views/software/software.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blogPost', component: BlogPostComponent},
  { path: 'blogViewDetail/:id', component: BlogViewDetailComponent},
  { path: 'us', component: UsComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'software', component: SoftwareComponent},
  { path: 'contactForm', component: ContactFormComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
