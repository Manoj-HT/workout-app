import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router, NavigationEnd } from '@angular/router';
import { ExerciseLogService } from './services/exercise-log/exercise-log-service';
import { of } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

describe('App', () => {
  let routerMock: any;
  let exerciseLogServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      events: of(new NavigationEnd(0, '/', '/')),
      navigate: jasmine.createSpy('navigate')
    };

    exerciseLogServiceMock = {
      sessionConfig: {
        update: jasmine.createSpy('update')
      }
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: routerMock },
        { provide: ExerciseLogService, useValue: exerciseLogServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  //   const fixture = TestBed.createComponent(App);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, workout-app');
  // });

  // it('should update exercise section on navigation end', () => {
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   routerMock.events = of(new NavigationEnd(1, '/warm-up', '/warm-up'));
  //   fixture.detectChanges();
  //   app.constructor();
  //   expect(exerciseLogServiceMock.sessionConfig.update).toHaveBeenCalledWith(jasmine.any(Function));
  // });

  // it('should start session and navigate to warm-up', () => {
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   app.sessionStart();
  //   expect(app.loadPage()).toBe(true);
  //   expect(routerMock.navigate).toHaveBeenCalledWith(['/warm-up']);
  // });

  // it('should set full screen on native platform', async () => {
  //   spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);
  //   spyOn(StatusBar, 'setStyle');
  //   spyOn(StatusBar, 'hide');
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   await app.setFullScreen();
  //   expect(StatusBar.setStyle).toHaveBeenCalledWith({ style: Style.Dark });
  //   expect(StatusBar.hide).toHaveBeenCalled();
  // });

  // it('should not set full screen on web platform', async () => {
  //   spyOn(Capacitor, 'isNativePlatform').and.returnValue(false);
  //   spyOn(StatusBar, 'setStyle');
  //   spyOn(StatusBar, 'hide');
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   await app.setFullScreen();
  //   expect(StatusBar.setStyle).not.toHaveBeenCalled();
  //   expect(StatusBar.hide).not.toHaveBeenCalled();
  // });
});