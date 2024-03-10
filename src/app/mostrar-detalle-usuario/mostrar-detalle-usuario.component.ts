import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarDetalleUsuarioComponent } from '../editar-detalle-usuario/editar-detalle-usuario.component';
import { AddDetalleUsuarioComponent } from '../add-detalle-usuario/add-detalle-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-detalle-usuario',
  templateUrl: './mostrar-detalle-usuario.component.html',
  styleUrls: ['./mostrar-detalle-usuario.component.css']
})
export class MostrarDetalleUsuarioComponent implements OnInit {

  usuarioDetalles: any;
  materiaSeleccionada: any | null = null;
  idUsuario: number = 0;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.idUsuario = id;
      this.usuarioService.obtenerDetallesUsuario(id).subscribe(detalles => {
        this.usuarioDetalles = detalles;
      });
    });    
  }

  cerrarComponente(): void {
    this.router.navigate(['/listar-usuarios']);
  }

  agregarDetalle(): void {
    if (!this.idUsuario) {
      console.error('No se ha proporcionado un ID de usuario válido');
      return;
    }

    const dialogRef = this.dialog.open(AddDetalleUsuarioComponent, {
      width: '400px',
      data: { idUsuario: this.idUsuario }
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.usuarioService.obtenerDetallesUsuario(this.idUsuario).subscribe(detalles => {
        this.usuarioDetalles = detalles;
      });
    });
  }

  editarDetalle(): void {
    if (!this.materiaSeleccionada) {
      Swal.fire('¡Error!', 'Debes seleccionar un detalle antes de editar.', 'error');
      return;
    }
  
    const dialogRef = this.dialog.open(EditarDetalleUsuarioComponent, {
      width: '400px',
      data: { detalle: this.materiaSeleccionada, idUsuario: this.idUsuario }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.actualizarDetallesUsuario(this.materiaSeleccionada.id, this.idUsuario, result).subscribe(detalles => {
          //Actualiza la lista de detalles de usuario después de editar el detalle
          this.usuarioService.obtenerDetallesUsuario(this.idUsuario).subscribe(updatedDetalles => {
            this.usuarioDetalles = updatedDetalles;
            Swal.fire('¡Detalle editado!', 'El detalle se ha editado correctamente.', 'success');
          });
        });
      }
    });
  }

  eliminarDetalle(): void {
    if (!this.materiaSeleccionada || !this.materiaSeleccionada.id) {
      Swal.fire('¡Error!', 'Debes seleccionar un detalle antes de eliminar.', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarDetalleUsuario(this.materiaSeleccionada.id).subscribe({
          next: () => {
            console.log('Detalle de usuario eliminado con éxito');
            Swal.fire(
              '¡Eliminado!',
              'El detalle de usuario ha sido eliminado.',
              'success'
            );
            // Volver a cargar los detalles del usuario después de eliminar el detalle
            this.usuarioService.obtenerDetallesUsuario(this.idUsuario).subscribe(detalles => {
              this.usuarioDetalles = detalles;
            });
          },
          error: (error) => {
            console.error('Error al eliminar detalle de usuario:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el detalle de usuario',
              'error'
            );
          }
        });
      }
    });
  }

  seleccionarMateria(detalle: any) {
    this.materiaSeleccionada = detalle;
  }

}
