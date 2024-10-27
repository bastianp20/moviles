import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciosesionAlumnoPage } from './iniciosesion-alumno.page';

describe('IniciosesionAlumnoPage', () => {
  let component: IniciosesionAlumnoPage;
  let fixture: ComponentFixture<IniciosesionAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciosesionAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
