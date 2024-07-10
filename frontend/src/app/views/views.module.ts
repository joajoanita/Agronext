import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogViewDetailComponent } from './blog-view-detail/blog-view-detail.component';
import { UsComponent } from './us/us.component';
import { ServicesComponent } from './services/services.component';
import { SoftwareComponent } from './software/software.component';
import { ContactFormComponent } from './contact-form/contact-form.component';




@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    BlogViewDetailComponent,
    UsComponent,
    ServicesComponent,
    SoftwareComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    
  ],
  exports: [
    HomeComponent,
    BlogComponent,
    BlogViewDetailComponent
  ]
})
export class ViewsModule { }
