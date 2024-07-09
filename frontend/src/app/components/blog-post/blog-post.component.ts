import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent {
  blogForm: FormGroup;
  errors: any = null;
  isSignedIn!: boolean;
  blogPosts: any[] = [];

  constructor( 
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    public auth: AuthStateService,

  ) {
      this.blogForm = this.fb.group({
        title: [],
        description: [],
        blogImage: [],
        blogTag: [],
      });
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });

    this.cargarBlogPost();
  }

  onSubmit() {
    if (this.blogForm.valid) {
     this.authService.blogPosts(this.blogForm.value).subscribe(
      response => {
        console.log('Blog post added successfully!', response);
      },
      error => {
        console.error('Error adding blog post', error);
      },
      () => {
        this.blogForm.reset();
        this.router.navigate(['blog']);
      }
     );
      
    }
  }

  cargarBlogPost(){
    this.authService.getBlogPosts().subscribe(
      data => {
        this.blogPosts = data;
      },
      errors => {
        console.error('Error al cargar el blog', errors);
      }
    );

  }
}
