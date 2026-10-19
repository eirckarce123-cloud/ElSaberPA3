
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/categorias';

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  actualizarCategoria(id: string, categoria: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoria);
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
