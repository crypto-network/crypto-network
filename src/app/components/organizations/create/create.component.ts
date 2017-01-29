import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { OrganizationInterface } from 'shared/api';
import { IAppState } from 'shared/ngrx';
import { OrganizationActions } from 'shared/ngrx/actions';

@Component({
  selector: 'organizationsCreate',
  styleUrls: [ './create.component.scss' ],
  templateUrl: './create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsCreateComponent {
  public formModel: OrganizationInterface = {
    name: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>,
    private organizationActions: OrganizationActions
  ) { }

  public createOrganization() {
    this.store.dispatch(this.organizationActions.addToCollection(this.formModel));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}