import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideRouter } from '@angular/router';
import { List } from './list';

describe('List', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [List],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(List);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
