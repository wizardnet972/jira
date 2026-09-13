import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { Planning } from './planning';

describe('Planning', () => {
  let component: Planning;
  let fixture: ComponentFixture<Planning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Planning],
      providers: [provideTanStackQuery(new QueryClient())],
    }).compileComponents();

    fixture = TestBed.createComponent(Planning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
