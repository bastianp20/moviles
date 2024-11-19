import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciosesionProfesorPage } from './iniciosesion-profesor.page';

describe('IniciosesionProfesorPage', () => {
  let component: IniciosesionProfesorPage;
  let fixture: ComponentFixture<IniciosesionProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciosesionProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
