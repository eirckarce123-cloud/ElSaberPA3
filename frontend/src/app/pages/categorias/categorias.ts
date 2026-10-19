
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias implements OnInit {
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  categorias: any[] = [];
  cargando = true;
  error = '';
  mensaje = '';
  editando = false;
  idEdicion = '';

  categoria = {
    id_categoria: '',
    nombre: '',
    seccion: '',
    descripcion: ''
  };

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true;

    this.categoriaService.obtenerCategorias().subscribe({
      next: (datos) => {
        this.categorias = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las categorías.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  guardarCategoria(): void {
    this.error = '';
    this.mensaje = '';

    const peticion = this.editando
      ? this.categoriaService.actualizarCategoria(this.idEdicion, this.categoria)
      : this.categoriaService.crearCategoria(this.categoria);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Categoría actualizada correctamente.'
          : 'Categoría registrada correctamente.';

        this.limpiarFormulario();
        this.cargarCategorias();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo guardar la categoría.';
        this.cdr.markForCheck();
      }
    });
  }

  prepararEdicion(categoria: any): void {
    this.categoria = {
      id_categoria: categoria.id_categoria,
      nombre: categoria.nombre,
      seccion: categoria.seccion,
      descripcion: categoria.descripcion
    };

    this.idEdicion = categoria.id_categoria;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarCategoria(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) {
      return;
    }

    this.categoriaService.eliminarCategoria(id).subscribe({
      next: () => {
        this.mensaje = 'Categoría eliminada correctamente.';
        this.cargarCategorias();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.mensaje || 'No se pudo eliminar la categoría.';
        this.cdr.markForCheck();
      }
    });
  }

  limpiarFormulario(): void {
    this.categoria = {
      id_categoria: '',
      nombre: '',
      seccion: '',
      descripcion: ''
    };

    this.editando = false;
    this.idEdicion = '';
  }
}
