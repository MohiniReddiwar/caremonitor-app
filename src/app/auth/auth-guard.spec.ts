import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { Auth } from './auth';
import { provideRouter } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<Auth>;
  let router: Router;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('Auth', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Auth, useValue: authSpy },
        provideRouter([])
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');
  });

  it('should allow authenticated user', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block unauthenticated user and redirect to login', () => {
    authService.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
