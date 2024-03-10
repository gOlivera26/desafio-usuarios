import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  roles: any[] = [
    { id: 'admin', descripcion: 'Admin' },
    { id: 'estudiante', descripcion: 'Estudiante' }
  ];

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idRol: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  agregarUsuario() {
    Swal.fire({
      title: '¿Seguro que desea agregar al usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar usuario',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agregarUsuarioConfirmado();
      }
    });
  }

  agregarUsuarioConfirmado() {
    if (this.usuarioForm.valid) {
      let nuevoUsuario = this.usuarioForm.value;
      nuevoUsuario.id = uuidv4(); 
  
      const rolSeleccionado = this.roles.find(rol => rol.id === nuevoUsuario.idRol);
      if (rolSeleccionado) {
        nuevoUsuario.rol = rolSeleccionado.descripcion; //Agregar la descripción del rol al objeto de usuario
        delete nuevoUsuario.idRol;
      }
  
      this.restService.postUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          console.log('Usuario agregado exitosamente:', response);
  
          this.usuarioService.agregarUsuario(nuevoUsuario);
          this.usuarioForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado exitosamente!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            Swal.fire({
              title: '¿Desea agregar otro usuario?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.isConfirmed) {
              } else {
                this.router.navigate(['/listar-usuarios']);
              }
            });
          });
        },
        error: (error) => {
          console.error('Error al agregar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar usuario',
            text: 'Por favor, inténtalo de nuevo más tarde.'
          });
        }
      });
    }
  }
  
  
}
