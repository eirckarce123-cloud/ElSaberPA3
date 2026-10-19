
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class Libros implements OnInit {
  private libroService = inject(LibroService);
  private cdr = inject(ChangeDetectorRef);

  libros: any[] = [];
  cargando = true;
  error = '';
  mensaje = '';
  editando = false;
  idEdicion = '';

  libro = {
    codigo: '',
    titulo: '',
    autor: '',
    editorial: '',
    anio: new Date().getFullYear()
  };

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;

    this.libroService.obtenerLibros().subscribe({
      next: (datos) => {
        this.libros = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los libros.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  guardarLibro(): void {
    this.error = '';
    this.mensaje = '';

    const peticion = this.editando
      ? this.libroService.actualizarLibro(this.idEdicion, this.libro)
      : this.libroService.crearLibro(this.libro);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Libro actualizado correctamente.'
          : 'Libro registrado correctamente.';

        this.limpiarFormulario();
        this.cargarLibros();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje
          || 'No se pudo guardar el libro. Revisa los datos.';
        this.cdr.markForCheck();
      }
    });
  }

  prepararEdicion(libro: any): void {
    this.libro = {
      codigo: libro.codigo,
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anio: libro.anio
    };

    this.idEdicion = libro._id;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

 
eliminarLibro(codigo: string): void {
  if (!confirm('¿Seguro que deseas eliminar este libro?')) {
    return;
  }

  this.libroService.eliminarLibro(codigo).subscribe({
    next: () => {
      this.mensaje = 'Libro eliminado correctamente.';
      this.cargarLibros();
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Error al eliminar:', err);
      this.error = err.error?.mensaje || 'No se pudo eliminar el libro.';
      this.cdr.markForCheck();
    }
  });
}


  limpiarFormulario(): void {
    this.libro = {
      codigo: '',
      titulo: '',
      autor: '',
      editorial: '',
      anio: new Date().getFullYear()
    };

    this.editando = false;
    this.idEdicion = '';
  }
}
