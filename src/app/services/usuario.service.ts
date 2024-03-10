import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario, DetalleUsuario } from '../models/usuario';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();

  private detallesSubject = new BehaviorSubject<DetalleUsuario[]>([]);
  detalles$: Observable<DetalleUsuario[]> = this.detallesSubject.asObservable();


  constructor(private restService: RestService) { 
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.restService.getUsuarios()
      .pipe(
        tap((usuarios: Usuario[]) => {
          console.log('Usuarios recibidos del backend:', usuarios);
          this.usuariosSubject.next(usuarios);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      });
  }

  agregarUsuario(usuario: any){
    const usuarios = this.usuariosSubject.value;
    usuarios.push(usuario);
    this.usuariosSubject.next(usuarios);
  }
  
  agregarDetalleUsuario(detalle: any): Observable<any> {
    return this.restService.postDetalleUsuario(detalle);
  }
  
  public obtenerDetallesUsuario(id: number): Observable<any> {
    return this.restService.getDetallesById(id);
  }
  
  actualizarDetallesUsuario(idDetalle: number, idUsuario: number, materia: string): Observable<any> {
    return this.restService.putDetalle(idDetalle, idUsuario, materia);
  }
  actualizarUsuario(usuario: any): Observable<any> {
    const usuarioConRol = { ...usuario, idRol: usuario.rol };
    return this.restService.putUsuario(usuarioConRol);
  }
  eliminarUsuario(id: number): Observable<any> {
    return this.restService.deleteUsuarioById(id);
  }
  
  eliminarDetalleUsuario(id: string): Observable<any> {
    return this.restService.deleteDetallesById(id);
  }
  actualizarListaUsuarios() {
    this.obtenerUsuarios();
  }
}
