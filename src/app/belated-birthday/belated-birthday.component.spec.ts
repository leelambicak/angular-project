import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelatedBirthdayComponent } from './belated-birthday.component';

describe('BelatedBirthdayComponent', () => {
  let component: BelatedBirthdayComponent;
  let fixture: ComponentFixture<BelatedBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BelatedBirthdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BelatedBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
