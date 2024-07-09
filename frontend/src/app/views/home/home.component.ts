import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  blogPosts: any[] = [];

  constructor(
    private blogService: AuthService,
  ){

  }
  ngOnInit(): void {
      this.cargarBlogPost();
  }

  cargarBlogPost(){
    this.blogService.getBlogPosts().subscribe(
      data => {
        this.blogPosts = data;
      },
      error => {
        console.error('Error al cargar los blog posts', error);
      }
    );
  }

}
