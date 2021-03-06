import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CloudtasksModule } from '@cloudtasks/ngx-image';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectModule } from 'ng2-select';

import { MultilingualModule } from 'shared/i18n/multilingual.module';

import { routing } from './subscriptions.routing';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionsHomeComponent } from './home/home.component';
import { SubscriptionsUserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    TooltipModule,
    ModalModule,
    BsDropdownModule,
    CloudtasksModule,
    MultilingualModule,
    NgxDatatableModule,
    SelectModule
  ],
  declarations: [
    SubscriptionsComponent,
    SubscriptionsHomeComponent,
    SubscriptionsUserComponent
  ]
})
export class SubscriptionsModule { }
