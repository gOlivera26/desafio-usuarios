import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private urlUsuario = 'http://localhost:7241';

  constructor(private httpClient: HttpClient) { }

  public getUsuarios(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.urlUsuario}/usuarios`);
  }
  
  public postUsuario(usuario: any): Observable<any>{
    return this.httpClient.post<any>(`${this.urlUsuario}/usuarios`, usuario);
  }
  
  public deleteUsuarioById(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.urlUsuario}/usuarios/${id}`, { responseType: 'text' as 'json' });
  }
  
  public putUsuario(usuario: any): Observable<any> {
    //Eliminar el campo 'idRol' si existe
    const { idRol, ...usuarioSinIdRol } = usuario;
    return this.httpClient.put<any>(`${this.urlUsuario}/usuarios/${usuario.id}`, usuarioSinIdRol);
  }

  public getDetallesById(id: number): Observable<any>{
    return this.httpClient.get<any[]>(`${this.urlUsuario}/detallesUsuarios?idUsuario=${id}`);
  }

  public putDetalle(idDetalle: number, idUsuario: number, materia: string): Observable<any> {
    return this.httpClient.put<any>(`${this.urlUsuario}/detallesUsuarios/${idDetalle}`, { idUsuario, materia });
  }
  public postDetalleUsuario(detalle: any): Observable<any> {
    return this.httpClient.post<any>(`${this.urlUsuario}/detallesUsuarios`, detalle);
  }

  public deleteDetallesById(id: string): Observable<string> {
    return this.httpClient.delete<any>(`${this.urlUsuario}/detallesUsuarios/${id}`);
  }
}
