import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdFormFieldModule, MdSelectModule, MdOptionModule } from '@angular/material';

import { environment } from '../../environments/environment';


import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    CommonModule,
    FormsModule,
    MdSelectModule,
    MdOptionModule,
    RouterModule.forChild(PagesRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    RegisterService
  ]
})

export class PagesModule {}
