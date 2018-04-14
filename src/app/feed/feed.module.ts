import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { Daterangepicker } from 'ng2-daterangepicker';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';

import { FeedService } from './feed.service';
import { FeedRoutes } from './feed.routing';

import { HistoricComponent } from './historic/historic.component';
import { LiveComponent } from './live/live.component';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    AgGridModule.withComponents([]),
    CommonModule,
    Daterangepicker,
    RouterModule.forChild(FeedRoutes),
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  declarations: [
    HistoricComponent,
    LiveComponent
  ],
  providers: [
    FeedService,
    DatePipe
  ]
})

export class FeedModule {}
