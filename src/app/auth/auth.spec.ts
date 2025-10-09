import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Auth Service', () => {
  let service: Auth;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cookieService: CookieService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        Auth,
        CookieService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(Auth);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

  it('should set token and email cookies on login', (done: DoneFn) => {
    const mockResponse = { token: 'mock-token', user: { email: 'test@example.com' } };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.login('test@example.com', 'password').subscribe(res => {
      expect(res.token).toBe('mock-token');
      expect(cookieService.get('token')).toBe('mock-token');
      expect(cookieService.get('email')).toBe('test@example.com');
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledOnceWith('/api/login', { email: 'test@example.com', password: 'password' });
  });

  it('should clear cookies on logout', () => {
    cookieService.set('token', 'abc');
    cookieService.set('email', 'test@example.com');

    service.logout();

    expect(cookieService.check('token')).toBeFalse();
    expect(cookieService.check('email')).toBeFalse();
  });

  it('should return true if token exists', () => {
    cookieService.set('token', 'abc');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if token does not exist', () => {
    cookieService.delete('token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return stored email', () => {
    cookieService.set('email', 'test@example.com');
    expect(service.getUserEmail()).toBe('test@example.com');
  });

  it('should return empty string if email not set', () => {
    cookieService.delete('email');
    expect(service.getUserEmail()).toBe('');
  });
});
