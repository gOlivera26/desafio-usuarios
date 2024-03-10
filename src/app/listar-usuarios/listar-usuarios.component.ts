  import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { Usuario } from '../models/usuario';
  import { UsuarioService } from '../services/usuario.service';
  import { Router } from '@angular/router'; 
  import Swal from 'sweetalert2';
  import { MatDialog } from '@angular/material/dialog';
  import { PutUsuarioComponent } from '../put-usuario/put-usuario.component';

  @Component({
    selector: 'app-listar-usuarios',
    templateUrl: './listar-usuarios.component.html',
    styleUrls: ['./listar-usuarios.component.css']
  })
  export class ListarUsuariosComponent implements OnInit, AfterViewInit {
    
    displayedColumns: string[] = ['nombre', 'email', 'rol', 'acciones'];
    dataSource = new MatTableDataSource<Usuario>();

    usuarioSeleccionado : Usuario | null = null; //almaceno el usuario para guardar copia de seguridad

    searchNombre: string = '';
    searchEmail: string = '';

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
      private dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.obtenerUsuarios();
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }

    obtenerUsuarios() {
      this.usuarioService.usuarios$.subscribe({
        next: (usuarios: Usuario[]) => {
          this.dataSource.data = usuarios;
        },
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      });
    }

    eliminarUsuario(usuario: Usuario) {
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
          this.usuarioService.eliminarUsuario(usuario.id).subscribe({
            next: () => {
              console.log('Usuario eliminado con éxito');
              Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
              );
              // Eliminar el usuario de la lista de datos
              const index = this.dataSource.data.findIndex(u => u.id === usuario.id);
              if (index !== -1) {
                this.dataSource.data.splice(index, 1);
                // Actualizar la vista de la tabla
                this.dataSource._updateChangeSubscription();
              }
            },
            error: (error) => {
              console.error('Error al eliminar usuario:', error);
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el usuario',
                'error'
              );
            }
          });
        }
      });
    }
    editarUsuario(usuario: Usuario) {
      this.usuarioSeleccionado = { ...usuario };
    
      const dialogRef = this.dialog.open(PutUsuarioComponent, {
        width: '600px',
        data: { usuario: usuario } 
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.dataSource.data.findIndex(u => u.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
          }
        } else {
          // Si la edición se cancela, restaurar los datos originales
          const index = this.dataSource.data.findIndex(u => u.id === usuario.id);
          if (index !== -1 && this.usuarioSeleccionado) {
            this.dataSource.data[index] = this.usuarioSeleccionado;
            this.dataSource._updateChangeSubscription();
          }
        }
      });
    }
    
    verDetalles(usuario: Usuario) {
      this.router.navigate(['/mostrar-detalle-usuario', usuario.id]);
    }

    //Filtrado buscar por nombre y email
    applyFilter() {
      this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
        const searchTerms = filter.toLowerCase().split(' ');
        return searchTerms.every(term => {
          return data.nombre.toLowerCase().startsWith(term) || data.email.toLowerCase().includes(term);
        });
      };

      const filterValue = `${this.searchNombre} ${this.searchEmail}`.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }

    clearFilter() {
      this.searchNombre = '';
      this.searchEmail = '';
      this.applyFilter();
    }
  }
