import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Burndown } from './burndown';

describe('Burndown', () => {
  let component: Burndown;
  let fixture: ComponentFixture<Burndown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Burndown],
    }).compileComponents();

    fixture = TestBed.createComponent(Burndown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
