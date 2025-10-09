import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly LOGIN_URL = '/api/login';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; user: { email: string } }>(
      this.LOGIN_URL,
      { email, password }
    ).pipe(
      tap((res) => {
        this.cookies.set('token', res.token);
        this.cookies.set('email', res.user.email);
      })
    );
  }

  logout() {
    this.cookies.delete('token');
    this.cookies.delete('email');
  }

  isAuthenticated(): boolean {
    return this.cookies.check('token');
  }

  getUserEmail(): string {
    return this.cookies.get('email') || '';
  }
}
