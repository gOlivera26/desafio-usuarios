import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';	

@Component({
  selector: 'app-add-detalle-usuario',
  templateUrl: './add-detalle-usuario.component.html',
  styleUrls: ['./add-detalle-usuario.component.css']
})
export class AddDetalleUsuarioComponent {
  detalleForm: FormGroup;
  saving = false; //Variable para controlar si se está guardando el detalle

  constructor(
    public dialogRef: MatDialogRef<AddDetalleUsuarioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder 
  ) {
    this.detalleForm = this.formBuilder.group({
      materia: ['', Validators.required]
    });
  }

  onSaveClick(): void {
    if (this.detalleForm.invalid || this.saving) {
      console.error('Formulario inválido o guardando');
      return;
    }
  
    this.saving = true; 
    const idDetalle = uuidv4();
  
    const nuevoDetalle = {
      id: idDetalle,
      idUsuario: this.data.idUsuario,
      materia: this.detalleForm.value.materia 
    };
  
    this.usuarioService.agregarDetalleUsuario(nuevoDetalle).subscribe({
      next: () => {
        console.log('Detalle de usuario agregado correctamente');
        Swal.fire('¡Detalle agregado!', 'El detalle se ha agregado correctamente.', 'success');
        this.dialogRef.close();
      },
      error: error => {
        console.error('Error al agregar detalle de usuario:', error);
      },
      complete: () => {
        this.saving = false; 
      }
    });
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
