import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-put-usuario',
  templateUrl: './put-usuario.component.html',
  styleUrls: ['./put-usuario.component.css']
})
export class PutUsuarioComponent {
  usuarioForm!: FormGroup;
  roles = [
    { id: 'admin', descripcion: 'Admin' },
    { id: 'estudiante', descripcion: 'Estudiante' }
  ];
  
  constructor(
    public dialogRef: MatDialogRef<PutUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: [this.data.usuario.nombre, Validators.required],
      email: [this.data.usuario.email, [Validators.required, Validators.email]],
      rol: [this.data.usuario.rol, Validators.required] 
    });
  }

  actualizarUsuario() {
    if (this.usuarioForm.valid) {
      const idUsuario = this.data.usuario.id; 
      //Construir el objeto
      const usuarioConId = { ...this.usuarioForm.value, id: idUsuario }; 
      delete usuarioConId.idRol;

      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar los detalles de este usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.actualizarUsuario(usuarioConId).subscribe({
            next: (usuarioActualizado) => {
              Swal.fire({
                title: '¡Actualizado!',
                text: 'Los detalles del usuario se han actualizado correctamente.',
                icon: 'success'
              });
              this.dialogRef.close(usuarioActualizado);
              // Emitir el evento para actualizar la lista de usuarios
              this.usuarioService.actualizarListaUsuarios();
            },
            error: (error) => {
              console.error('Error al actualizar usuario:', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar los detalles del usuario.',
                icon: 'error'
              });
            }
          });
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
