import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, mobilemed-frontend');
  });
});
it('should enable ripple effect on PrimeNG during initialization', () => {
  const fixture = TestBed.createComponent(App);
  const app = fixture.componentInstance;
  const primengSpy = spyOn(app['primeng'].ripple, 'set');
  
  app.ngOnInit();

  expect(primengSpy).toHaveBeenCalledWith(true);
});

it('should throw an error if PrimeNG is not initialized', () => {
  const fixture = TestBed.createComponent(App);
  const app = fixture.componentInstance;

  app['primeng'] = null as any; // Simulate uninitialized PrimeNG

  expect(() => app.ngOnInit()).toThrowError();
});
