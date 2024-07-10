import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
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
  getImageUrl(imagePath: string): string{
    return `http://127.0.0.1:8000/images/blogPost/${imagePath}`;
  }
}
