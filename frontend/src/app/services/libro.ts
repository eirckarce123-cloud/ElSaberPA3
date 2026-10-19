import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/libros';

  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearLibro(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro);
  }

  actualizarLibro(id: string, libro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, libro);
  }

  eliminarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}