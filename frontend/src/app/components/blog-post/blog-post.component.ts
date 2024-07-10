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
  selectedFile: File | undefined;

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
    if (this.blogForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.blogForm.get('title')!.value);
      formData.append('description', this.blogForm.get('description')!.value);
      formData.append('blogTag', this.blogForm.get('blogTag')!.value);
      formData.append('blogImage', this.selectedFile, this.selectedFile.name);

      this.authService.blogPosts(formData).subscribe(
        response => {
          console.log('Blog post added successfully!', response);
          this.blogForm.reset();
          this.router.navigate(['blog']);
        },
        error => {
          console.error('Error adding blog post', error);
        }
      );
    } else {
      console.error('Formulario no válido o archivo no seleccionado');
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

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0]; // Guarda el archivo seleccionado
    } else {
      console.error('No se seleccionó ningún archivo o files es undefined');
    }
  }
}
