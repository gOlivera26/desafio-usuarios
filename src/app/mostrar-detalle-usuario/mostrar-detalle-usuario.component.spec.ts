import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetalleUsuarioComponent } from './mostrar-detalle-usuario.component';

describe('MostrarDetalleUsuarioComponent', () => {
  let component: MostrarDetalleUsuarioComponent;
  let fixture: ComponentFixture<MostrarDetalleUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarDetalleUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarDetalleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
