import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { Layout } from './layout';

describe('Layout', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Layout);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
