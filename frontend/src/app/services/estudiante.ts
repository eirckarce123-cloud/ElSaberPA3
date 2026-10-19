
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  obtenerEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearEstudiante(estudiante: any): Observable<any> {
    return this.http.post(this.apiUrl, estudiante);
  }

  actualizarEstudiante(id: string, estudiante: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estudiante);
  }

  eliminarEstudiante(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
