import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleUsuarioComponent } from './editar-detalle-usuario.component';

describe('EditarDetalleUsuarioComponent', () => {
  let component: EditarDetalleUsuarioComponent;
  let fixture: ComponentFixture<EditarDetalleUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarDetalleUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarDetalleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
