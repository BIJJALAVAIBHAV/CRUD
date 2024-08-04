import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLIstComponent } from './employee-list.component';

describe('EmployeeLIstComponent', () => {
  let component: EmployeeLIstComponent;
  let fixture: ComponentFixture<EmployeeLIstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLIstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
