import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroprofesorPage } from './registroprofesor.page';

describe('RegistroprofesorPage', () => {
  let component: RegistroprofesorPage;
  let fixture: ComponentFixture<RegistroprofesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroprofesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
