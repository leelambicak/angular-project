import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelatedAnniversaryComponent } from './belated-anniversary.component';

describe('BelatedAnniversaryComponent', () => {
  let component: BelatedAnniversaryComponent;
  let fixture: ComponentFixture<BelatedAnniversaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BelatedAnniversaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BelatedAnniversaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
