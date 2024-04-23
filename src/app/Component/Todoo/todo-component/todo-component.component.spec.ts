import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponentComponent } from './todo-component.component';

describe('TodoComponentComponent', () => {
  let component: TodoComponentComponent;
  let fixture: ComponentFixture<TodoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
