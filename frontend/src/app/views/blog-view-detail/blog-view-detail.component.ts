import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-blog-view-detail',
  templateUrl: './blog-view-detail.component.html',
  styleUrls: ['./blog-view-detail.component.css']
})
export class BlogViewDetailComponent implements OnInit{
  postId: number | undefined;
  post: any; // Objeto para almacenar los detalles del post

  constructor(
    private route: ActivatedRoute,
    private blogService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = +params['id']; // Obtiene el ID del parámetro de la ruta
      this.loadPostDetails(this.postId); // Carga los detalles del post
    });
  }

  loadPostDetails(id: number) {
    this.blogService.getBlogPostById(id).subscribe(
      data => {
        this.post = data; // Asigna los detalles del post obtenidos del servicio
      },
      error => {
        console.error('Error al cargar los detalles del post', error);
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`; // Ajusta esta URL según sea necesario
  }
}
