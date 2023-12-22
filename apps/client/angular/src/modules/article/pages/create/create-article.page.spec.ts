import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticlePage } from './create-article.page';

describe('CreateArticlePage', () => {
  let component: CreateArticlePage;
  let fixture: ComponentFixture<CreateArticlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArticlePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
