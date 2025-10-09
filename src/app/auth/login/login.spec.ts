import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: Partial<Auth>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login')
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        Login,
        ReactiveFormsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule
      ],
      providers: [
        { provide: Auth, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form as valid when email and password are provided', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call Auth.login and navigate on successful login', fakeAsync(() => {
    const formValue = { email: 'test@example.com', password: 'password' };
    component.loginForm.setValue(formValue);
    (mockAuthService.login as jasmine.Spy).and.returnValue(of({ token: 'abc', user: { email: 'test@example.com' } }));

    component.onSubmit();
    tick();

    expect(mockAuthService.login).toHaveBeenCalledWith(formValue.email, formValue.password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  }));

  it('should set error when login fails', fakeAsync(() => {
    const formValue = { email: 'fail@example.com', password: 'wrong' };
    component.loginForm.setValue(formValue);
    (mockAuthService.login as jasmine.Spy).and.returnValue(throwError(() => new Error('Login failed')));

    component.onSubmit();
    tick();

    expect(mockAuthService.login).toHaveBeenCalledWith(formValue.email, formValue.password);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Login failed');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));
});
