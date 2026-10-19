
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AutorService } from '../../services/autor';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './autores.html',
  styleUrl: './autores.css'
})
export class Autores implements OnInit {
  private autorService = inject(AutorService);
  private cdr = inject(ChangeDetectorRef);

  autores: any[] = [];
  cargando = true;
  error = '';
  mensaje = '';
  editando = false;
  idEdicion = '';

  autor = {
    dni: '',
    nombre: '',
    nacionalidad: '',
    anio_nacimiento: new Date().getFullYear()
  };

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.cargando = true;

    this.autorService.obtenerAutores().subscribe({
      next: (datos) => {
        this.autores = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los autores.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  guardarAutor(): void {
    this.error = '';
    this.mensaje = '';

    const peticion = this.editando
      ? this.autorService.actualizarAutor(this.idEdicion, this.autor)
      : this.autorService.crearAutor(this.autor);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Autor actualizado correctamente.'
          : 'Autor registrado correctamente.';

        this.limpiarFormulario();
        this.cargarAutores();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo guardar el autor.';
        this.cdr.markForCheck();
      }
    });
  }

  prepararEdicion(autor: any): void {
    this.autor = {
      dni: autor.dni,
      nombre: autor.nombre,
      nacionalidad: autor.nacionalidad,
      anio_nacimiento: autor.anio_nacimiento
    };

    this.idEdicion = autor.dni;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarAutor(dni: string): void {
    if (!confirm('¿Seguro que deseas eliminar este autor?')) {
      return;
    }

    this.autorService.eliminarAutor(dni).subscribe({
      next: () => {
        this.mensaje = 'Autor eliminado correctamente.';
        this.cargarAutores();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo eliminar el autor.';
        this.cdr.markForCheck();
      }
    });
  }

  limpiarFormulario(): void {
    this.autor = {
      dni: '',
      nombre: '',
      nacionalidad: '',
      anio_nacimiento: new Date().getFullYear()
    };

    this.editando = false;
    this.idEdicion = '';
  }
}
