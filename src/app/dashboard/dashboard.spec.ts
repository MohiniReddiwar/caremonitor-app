import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mockAuthService: Partial<Auth>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      getUserEmail: jasmine.createSpy('getUserEmail').and.returnValue('test@example.com'),
      logout: jasmine.createSpy('logout')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard, MatToolbarModule, MatButtonModule, MatCardModule],
      providers: [
        { provide: Auth, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userEmail from Auth service', () => {
    expect(component.userEmail).toBe('test@example.com');
    expect(mockAuthService.getUserEmail).toHaveBeenCalled();
  });

  it('should call logout on Auth service and navigate to login when Logout button clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    fixture.detectChanges();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
