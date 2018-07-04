import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as firebase from 'firebase';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AppRoutes } from './app.routing';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';



firebase.initializeApp(environment.firebase);

@NgModule({
    imports:[
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {useHash: true}),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        UsersModule  
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    bootstrap:[ 
        AppComponent 
    ]
})
export class AppModule { }
