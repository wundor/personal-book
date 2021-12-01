import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthComponent } from './net-worth.component';

describe('NetWorthComponent', () => {
  let component: NetWorthComponent;
  let fixture: ComponentFixture<NetWorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
