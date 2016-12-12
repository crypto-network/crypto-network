// angular
import { ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
// any operators needed throughout your application
import './operators';

// app
import { AnalyticsService } from 'frameworks/analytics';
import { BaseComponent, Config, LogService } from 'frameworks/core';
import { CloudtasksService } from 'angular2-cloudtasks';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from 'ng2-idle/core';

// ngrx
// import { Notify } from '@ngrx/notify';

import { LoopBackAuth, UserApi } from 'frameworks/api';

/**
 * This class represents the main application component.
 */
@BaseComponent({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.Default, // Everything else uses OnPush
  styleUrls: [ 'app.component.scss' ],
  template: `
  <div platform scrollSpy>
    <router-outlet></router-outlet>
    <!--<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>-->
  </div>
  `
})
export class AppComponent {

  constructor(
    public viewContainerRef: ViewContainerRef,
    public analytics: AnalyticsService,
    public logger: LogService,
    public cloudtasks: CloudtasksService,
    // private idle: Idle,
    // private notify: Notify,
    private location: Location,
    private auth: LoopBackAuth,
    private user: UserApi
  ) {
    this.analytics.devMode(`${Config.ENVIRONMENT().ENV}` === 'development' ? true : false);
    logger.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);

    cloudtasks.setId('demo');

    this.checkLogginToken();
    this.initIdleService();
    // this.checkLoginCookie();
    // this.initNotifications();
  }

  checkLogginToken() {
    const token = this.auth.getToken();
    if (token  && token.ttl) {
      let expires = new Date(token.issuedAt || token.created || parseInt( token.id.toString().substring(0,8), 16 ) * 1000);
      expires.setSeconds(expires.getSeconds() + token.ttl);
      if (expires <= new Date()) {
        this.user.logout().subscribe(response => this.location.replaceState(''));
      }
    }
  }

  initIdleService() {
    /*// sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds.
    // After 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // Subscribe to idle events.
    // Add your logic on how the application should respond, such as displaying
    // a warning dialog onIdleStart, or redirecting to logout page onTImeout, etc.
    this.idle.onIdleStart.subscribe(() => {
      console.log('IdleStart');
    });
    this.idle.onIdleEnd.subscribe(() => {
      console.log('IdleEnd');
    });
    this.idle.onTimeoutWarning.subscribe((countdown:number) => {
      console.log('TimeoutWarning: ' + countdown);
    });
    this.idle.onTimeout.subscribe(() => {
      console.log('Timeout');
    });

    // start watching for idleness right away.
    this.idle.watch();*/
  }

  initNotifications() {
    /*this.notify.requestPermission().subscribe(permission => {
      if (permission) {
        // console.log(permission);

        this.notify.open('Hello world!', {})
          // Automatically close the notification after 5 seconds
          //.takeUntil(Observable.timer(5000))
          // Close the notification after it has been clicked once
          .take(1)
          .subscribe(notification => {

          });
      }
    });*/
  }
}