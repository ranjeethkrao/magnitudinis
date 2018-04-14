import { Component, OnInit } from '@angular/core';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/feed',
        title: 'Feeds',
        type: 'sub',
        icontype: 'timeline',
        children: [
            {path: 'live', title: 'Live', ab:'L'},
            {path: 'historic', title: 'Historic', ab:'H'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
           // if we are on windows OS we activate the perfectScrollbar function
            const $sidebar = $('.sidebar-wrapper');
            $sidebar.perfectScrollbar();
            // if we are on windows OS we activate the perfectScrollbar function
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
