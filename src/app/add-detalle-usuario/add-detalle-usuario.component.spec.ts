import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetalleUsuarioComponent } from './add-detalle-usuario.component';

describe('AddDetalleUsuarioComponent', () => {
  let component: AddDetalleUsuarioComponent;
  let fixture: ComponentFixture<AddDetalleUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDetalleUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDetalleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
