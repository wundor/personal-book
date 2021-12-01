import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: ReportsTabsComponent;
  let fixture: ComponentFixture<ReportsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
