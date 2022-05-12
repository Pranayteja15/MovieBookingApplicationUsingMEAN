import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocmovComponent } from './locmov.component';

describe('LocmovComponent', () => {
  let component: LocmovComponent;
  let fixture: ComponentFixture<LocmovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocmovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocmovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
