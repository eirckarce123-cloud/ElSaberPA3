
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/autores';

  obtenerAutores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearAutor(autor: any): Observable<any> {
    return this.http.post(this.apiUrl, autor);
  }

  actualizarAutor(id: string, autor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, autor);
  }

  eliminarAutor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

