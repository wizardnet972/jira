import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideRouter } from '@angular/router';
import { Active } from './active';

describe('Active', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Active],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Active);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
