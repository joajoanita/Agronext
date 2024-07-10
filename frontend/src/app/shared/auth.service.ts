import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
  profile_img!: String;
}

export class blogPost {
  title!: String;
  description!: String;
  blogImage!: String;
  blogTag!: String;
  id_user!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Registro de usuario
  registering(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Inicio de sesión
  login(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Acceso al usuario
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }

  //Hacer post de blog (CREATE)
  blogPosts(postData: any): Observable<any> { 
    return this.http.post('http://127.0.0.1:8000/api/auth/blogPost', postData);
  }

  // Recoger los blogPost añadidos (READ)
  getBlogPosts(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/blogPost');
  }

  // Recoger los blogPost añadidos por ID(READ)
  getBlogPostById(id:number): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/auth/blogPost/${id}`);
  }

  // Borrar los blog post (DELETE)
  deleteBlogPost(blogId: number): Observable<any>{
    return this.http.delete(`http://127.0.0.1:8000/api/auth/blogPost/${blogId}`);
  }

  updateBlogPost(updateBlogPost: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/auth/blogPost', updateBlogPost)
  }
  
}