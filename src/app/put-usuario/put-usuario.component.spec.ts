import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutUsuarioComponent } from './put-usuario.component';

describe('PutUsuarioComponent', () => {
  let component: PutUsuarioComponent;
  let fixture: ComponentFixture<PutUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PutUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
