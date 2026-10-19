
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EditorialService } from '../../services/editorial';

@Component({
  selector: 'app-editoriales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editoriales.html',
  styleUrl: './editoriales.css'
})
export class Editoriales implements OnInit {
  private editorialService = inject(EditorialService);
  private cdr = inject(ChangeDetectorRef);

  editoriales: any[] = [];
  cargando = true;
  error = '';
  mensaje = '';
  editando = false;
  idEdicion = '';

  editorial = {
    ruc: '',
    nombre: '',
    telefono: '',
    direccion: ''
  };

  ngOnInit(): void {
    this.cargarEditoriales();
  }

  cargarEditoriales(): void {
    this.cargando = true;

    this.editorialService.obtenerEditoriales().subscribe({
      next: (datos) => {
        this.editoriales = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las editoriales.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  guardarEditorial(): void {
    this.error = '';
    this.mensaje = '';

    const peticion = this.editando
      ? this.editorialService.actualizarEditorial(this.idEdicion, this.editorial)
      : this.editorialService.crearEditorial(this.editorial);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Editorial actualizada correctamente.'
          : 'Editorial registrada correctamente.';

        this.limpiarFormulario();
        this.cargarEditoriales();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo guardar la editorial.';
        this.cdr.markForCheck();
      }
    });
  }

  prepararEdicion(editorial: any): void {
    this.editorial = {
      ruc: editorial.ruc,
      nombre: editorial.nombre,
      telefono: editorial.telefono,
      direccion: editorial.direccion
    };

    this.idEdicion = editorial.ruc;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarEditorial(ruc: string): void {
    if (!confirm('¿Seguro que deseas eliminar esta editorial?')) {
      return;
    }

    this.editorialService.eliminarEditorial(ruc).subscribe({
      next: () => {
        this.mensaje = 'Editorial eliminada correctamente.';
        this.cargarEditoriales();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo eliminar la editorial.';
        this.cdr.markForCheck();
      }
    });
  }

  limpiarFormulario(): void {
    this.editorial = {
      ruc: '',
      nombre: '',
      telefono: '',
      direccion: ''
    };

    this.editando = false;
    this.idEdicion = '';
  }
}
