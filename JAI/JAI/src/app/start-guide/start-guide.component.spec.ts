import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGuideComponent } from './start-guide.component';

describe('StartGuideComponent', () => {
  let component: StartGuideComponent;
  let fixture: ComponentFixture<StartGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
