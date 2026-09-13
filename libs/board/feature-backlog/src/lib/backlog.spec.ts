import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideRouter } from '@angular/router';
import { Backlog } from './backlog';

describe('Backlog', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Backlog],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Backlog);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
