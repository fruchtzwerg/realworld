import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentShellComponent } from './comment-shell.component';

describe('CommentShellComponent', () => {
  let component: CommentShellComponent;
  let fixture: ComponentFixture<CommentShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
