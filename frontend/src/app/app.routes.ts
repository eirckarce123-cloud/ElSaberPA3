import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Libros } from './pages/libros/libros';
import { Autores } from './pages/autores/autores';
import { Editoriales } from './pages/editoriales/editoriales';
import { Estudiantes } from './pages/estudiantes/estudiantes';
import { Categorias } from './pages/categorias/categorias';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'libros', component: Libros },
  { path: 'autores', component: Autores },
  { path: 'editoriales', component: Editoriales },
  { path: 'estudiantes', component: Estudiantes },
{ path: 'categorias', component: Categorias },
  { path: '**', redirectTo: '' }
];