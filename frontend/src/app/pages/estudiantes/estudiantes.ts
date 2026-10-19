
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstudianteService } from '../../services/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class Estudiantes implements OnInit {
  private estudianteService = inject(EstudianteService);
  private cdr = inject(ChangeDetectorRef);

  estudiantes: any[] = [];
  cargando = true;
  error = '';
  mensaje = '';
  editando = false;
  idEdicion = '';

  estudiante = {
    matricula: '',
    nombre: '',
    carrera: '',
    telefono: ''
  };

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.cargando = true;

    this.estudianteService.obtenerEstudiantes().subscribe({
      next: (datos) => {
        this.estudiantes = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los estudiantes.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  guardarEstudiante(): void {
    this.error = '';
    this.mensaje = '';

    const peticion = this.editando
      ? this.estudianteService.actualizarEstudiante(this.idEdicion, this.estudiante)
      : this.estudianteService.crearEstudiante(this.estudiante);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Estudiante actualizado correctamente.'
          : 'Estudiante registrado correctamente.';

        this.limpiarFormulario();
        this.cargarEstudiantes();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo guardar el estudiante.';
        this.cdr.markForCheck();
      }
    });
  }

  prepararEdicion(estudiante: any): void {
    this.estudiante = {
      matricula: estudiante.matricula,
      nombre: estudiante.nombre,
      carrera: estudiante.carrera,
      telefono: estudiante.telefono
    };

    this.idEdicion = estudiante.matricula;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarEstudiante(matricula: string): void {
    if (!confirm('¿Seguro que deseas eliminar este estudiante?')) {
      return;
    }

    this.estudianteService.eliminarEstudiante(matricula).subscribe({
      next: () => {
        this.mensaje = 'Estudiante eliminado correctamente.';
        this.cargarEstudiantes();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo eliminar el estudiante.';
        this.cdr.markForCheck();
      }
    });
  }

  limpiarFormulario(): void {
    this.estudiante = {
      matricula: '',
      nombre: '',
      carrera: '',
      telefono: ''
    };

    this.editando = false;
    this.idEdicion = '';
  }
}
