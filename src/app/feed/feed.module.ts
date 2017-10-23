import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule, MdTableModule } from '@angular/material';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FeedRoutes } from './feed.routing';

import { AgGridComponent } from '../ag-grid/ag-grid.component';
import { HistoricComponent } from './historic/historic.component';
import { HistoricService } from './historic/historic.service';

import { LiveComponent } from './live/live.component';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    AgGridModule.withComponents({
      AgGridComponent
    }),
    CommonModule,
    RouterModule.forChild(FeedRoutes),
    FormsModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
    MdSelectModule,
    MdTableModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TagInputModule
    
  ],
  declarations: [
    AgGridComponent,
    HistoricComponent,
    LiveComponent
  ],
  providers: [
    HistoricService,
    DatePipe
  ]
})

export class FeedModule {}
