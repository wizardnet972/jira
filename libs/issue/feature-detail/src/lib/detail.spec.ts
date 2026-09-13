import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideRouter } from '@angular/router';
import { Detail } from './detail';

describe('Detail', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Detail],
      providers: [provideTanStackQuery(new QueryClient()), provideRouter([{ path: '**', component: Detail }])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Detail);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
