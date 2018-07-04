import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { UsersRoutes } from './users.routing';

@NgModule({
    imports: [ 
        RouterModule.forChild(UsersRoutes), 
        CommonModule,
        MatSelectModule,
        AgGridModule.withComponents([ComboBoxComponent])
    ],
    declarations: [ UsersComponent, ComboBoxComponent ],
    exports: [ UsersComponent ]
})

export class UsersModule {}
