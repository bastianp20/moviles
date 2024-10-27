import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAlumnosPage } from './registro-alumnos.page';

describe('RegistroAlumnosPage', () => {
  let component: RegistroAlumnosPage;
  let fixture: ComponentFixture<RegistroAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
