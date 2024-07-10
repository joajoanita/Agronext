import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit{
  blogPosts: any[] = []; 
  isSignedIn!: boolean;


  constructor(
    private blogService: AuthService,
    private auth: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.cargarBlogPosts();
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    
  }

  cargarBlogPosts() {
    this.blogService.getBlogPosts().subscribe(
      data => {
        this.blogPosts = data;   
      },
      error => {
        console.error('Error al cargar los blog posts', error);
      }
    );
  }

  
  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/images/blogPost/${imagePath}`;
  }

  onDelete(blogId:number){
    this.blogService.deleteBlogPost(blogId).subscribe(
      () => {
        console.log(`The blog with ID ${blogId} is deleted`);
      },
      error => {
        console.error('Error al cargar los blog posts', error);
      }
    );
  }
}
 

