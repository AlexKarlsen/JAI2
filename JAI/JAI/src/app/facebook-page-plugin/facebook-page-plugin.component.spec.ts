import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookPagePluginComponent } from './facebook-page-plugin.component';

describe('FacebookPagePluginComponent', () => {
  let component: FacebookPagePluginComponent;
  let fixture: ComponentFixture<FacebookPagePluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookPagePluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookPagePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
