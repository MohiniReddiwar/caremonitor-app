import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockApiInterceptor } from './mock-api-interceptor';
import { take } from 'rxjs/operators';

describe('MockApiInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([MockApiInterceptor])
        )
      ]
    });

    http = TestBed.inject(HttpClient);
  });

  it('should return mock items for GET /api/items', (done) => {
    http.get<any[]>('/api/items').pipe(take(1)).subscribe(res => {
      expect(res.length).toBe(3);
      expect(res[0].name).toBe('Item 1');
      done();
    });
  });

  it('should return mock token and email for POST /api/login', (done) => {
    const payload = { email: 'test@example.com', password: 'password' };
    http.post<any>('/api/login', payload).pipe(take(1)).subscribe(res => {
      expect(res.token).toBe('mock-token-123');
      expect(res.user.email).toBe('test@example.com');
      done();
    });
  });

  it('should pass through unknown requests and fail', (done) => {
    http.get('/api/unknown').subscribe({
      next: () => fail('Should not succeed for unknown URL'),
      error: () => done()
    });
  });
});
