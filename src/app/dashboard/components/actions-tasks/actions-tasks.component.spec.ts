import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTasksComponent } from './actions-tasks.component';

describe('ActionsTasksComponent', () => {
  let component: ActionsTasksComponent;
  let fixture: ComponentFixture<ActionsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
