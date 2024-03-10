import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-editar-detalle-usuario',
  templateUrl: './editar-detalle-usuario.component.html',
  styleUrls: ['./editar-detalle-usuario.component.css']
})
export class EditarDetalleUsuarioComponent {
  detalleForm: FormGroup; 
  idUsuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditarDetalleUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder 
  ) {
    this.idUsuario = this.data.idUsuario;
    this.detalleForm = this.formBuilder.group({
      materia: ['', Validators.required]
    });

    if (data && data.detalle && data.detalle.materia) {
      this.detalleForm.patchValue({
        materia: data.detalle.materia
      });
    }
  }

  onSaveClick(): void {
    if (this.detalleForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
  
    const idDetalle = this.data.detalle.id;
    const materiaActualizada = this.detalleForm.value.materia;
  
    this.usuarioService.actualizarDetallesUsuario(this.data.detalle.id, this.idUsuario, materiaActualizada).subscribe({
      next: () => {
        console.log('Detalle actualizado correctamente');
        this.dialogRef.close(materiaActualizada); //Pasar la materia actualizada al cerrar el diálogo
      },
      error: error => {
        console.error('Error al actualizar detalle:', error);
      }
    });
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
