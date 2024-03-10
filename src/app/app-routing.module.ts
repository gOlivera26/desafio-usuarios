import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarDetalleUsuarioComponent } from './mostrar-detalle-usuario/mostrar-detalle-usuario.component'; 
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { PutUsuarioComponent } from './put-usuario/put-usuario.component';

const routes: Routes = [
  { path: 'mostrar-detalle-usuario/:id', component: MostrarDetalleUsuarioComponent }, 
  {path: 'listar-usuarios', component: ListarUsuariosComponent},
  {path: 'add-usuario', component:AddUsuarioComponent},
  {path: 'put-usuario/:id', component:PutUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


