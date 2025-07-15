import { Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ExamesComponent } from './pages/exames/exames.component';

export const routes: Routes = [
  { path: 'Pacientes', component: PacientesComponent },
  { path: 'Pacientes/:id', component: ExamesComponent },
  { path: '', redirectTo: '/Pacientes', pathMatch: 'full' }
];