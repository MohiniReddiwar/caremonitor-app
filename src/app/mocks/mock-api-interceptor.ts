import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const MockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Mock GET /api/items
  if (req.url.endsWith('/api/items') && req.method === 'GET') {
    const mockItems = [
      { id: 1, name: 'Item 1', description: 'Description for Item 1' },
      { id: 2, name: 'Item 2', description: 'Description for Item 2' },
      { id: 3, name: 'Item 3', description: 'Description for Item 3' }
    ];
    return of(new HttpResponse({ status: 200, body: mockItems })).pipe(delay(800));
  }

  // Mock POST /api/login
  if (req.url.endsWith('/api/login') && req.method === 'POST') {
    const body = req.body as { email: string; password: string };
    return of(new HttpResponse({
      status: 200,
      body: { token: 'mock-token-123', user: { email: body.email } }
    })).pipe(delay(800));
  }

  return next(req);
};
