import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostcodeService } from '../../services/postcode.service';
import { MockPostcodeService } from '../../services/testing/postcode.testing.service';

import { PostcodeIndexComponent } from './postcode-index.component';

describe('PostcodeIndexComponent', () => {
  let component: PostcodeIndexComponent;
  let fixture: ComponentFixture<PostcodeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcodeIndexComponent ],
      providers: [ {
        provide: PostcodeService,
        useClass: MockPostcodeService
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
