import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireCreatorComponent } from './questionnaire-creator.component';

describe('QuestionnaireCreatorComponent', () => {
  let component: QuestionnaireCreatorComponent;
  let fixture: ComponentFixture<QuestionnaireCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
