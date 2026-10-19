
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/editoriales';

  obtenerEditoriales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearEditorial(editorial: any): Observable<any> {
    return this.http.post(this.apiUrl, editorial);
  }

  actualizarEditorial(id: string, editorial: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, editorial);
  }

  eliminarEditorial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
