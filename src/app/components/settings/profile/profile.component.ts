import { Subscription } from 'rxjs/Subscription';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { ConfigService } from '@ngx-config/core';

import {
  User,
  UserApi,
  LoopbackAuthActions,
  UserActions,
  getLoopbackAuthAccount
} from 'shared/api';
import { IAppState, AlertActions } from 'shared/ngrx';

@Component({
  selector: 'app-settings-profile',
  styleUrls: [ './profile.component.scss' ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent implements OnDestroy {
  public config: any;
  public formModel: User;
  public getCurrentUserId: string;

  private destroyStream$: AsyncSubject<any> = new AsyncSubject();

  constructor(
    private store: Store<IAppState>,
    private user: UserApi,
    private configService: ConfigService
  ) {
    this.config = this.configService.getSettings();

    this.store.select(getLoopbackAuthAccount)
      .takeUntil(this.destroyStream$)
      .subscribe((currentUser: User) => {
        if (!currentUser) { return; }

        this.formModel = (<any> Object).assign({}, currentUser);
        this.getCurrentUserId = currentUser.id;
      });

    this.fileNameRewrite = this.fileNameRewrite.bind(this);
    this.getUploadUrl = this.getUploadUrl.bind(this);
    this.onUploadComplete = this.onUploadComplete.bind(this);
  }

  public ngOnDestroy() {
    this.destroyStream$.next(1);
    this.destroyStream$.complete();
  }

  public submitUpdate() {
    this.store.dispatch(new LoopbackAuthActions.updateUserProperties({
      name: this.formModel.name,
      photo: this.formModel.photo,
      username: this.formModel.username || null
    }, {
      alert: {
        success: {
          message: 'Profile updated successfully.',
          type: 'info'
        }
      }
    }));
  }

  public fileNameRewrite(fileName: string): string {
    return 'user/' + this.getCurrentUserId + '/avatar';
  }

  public getUploadUrl(fileName: string, fileType: string, options: any = {}) {
    options.fileType = fileType;
    return this.user.s3PUTSignedUrl(this.getCurrentUserId, fileName, options);
  }

  public onUploadComplete(item: any) {
    this.user.updateS3Photo(this.getCurrentUserId, {
      url: item.url.split('?')[0],
      key: item.file.name
    }).subscribe(
      (response: any) => {
        if (response.error) {
          this.store.dispatch(new AlertActions.SetAlert({
            message: response.error_description,
            type: 'error'
          }));
        } else {
          this.store.dispatch(new LoopbackAuthActions.updateUserProperties({
            photo: response
          }));
        }
      },
      (error) => this.store.dispatch(new AlertActions.SetAlert({
        message: error.message,
        type: 'error'
      }))
    );
  }
}
