import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideRouter } from '@angular/router';
import { View } from './view';

describe('View', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [View],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(View);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
