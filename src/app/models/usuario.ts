export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string; 
  detalles: DetalleUsuario[];
}

export interface DetalleUsuario {
  idDetalle: number;
  idUsuario: number;
  materia: string;
}
