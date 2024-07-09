import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';




@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    
  ],
  exports: [
    HomeComponent,
    BlogComponent
  ]
})
export class ViewsModule { }
