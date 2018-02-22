import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ShortcutComponent } from './shortcut.component';
import { ShortcutDetailComponent } from './shortcut-detail.component';
import { ShortcutPopupComponent } from './shortcut-dialog.component';
import { ShortcutDeletePopupComponent } from './shortcut-delete-dialog.component';

export const shortcutRoute: Routes = [
    {
        path: 'shortcut',
        component: ShortcutComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'shortcut/:id',
        component: ShortcutDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shortcutPopupRoute: Routes = [
    {
        path: 'shortcut-new',
        component: ShortcutPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shortcut/:id/edit',
        component: ShortcutPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shortcut/:id/delete',
        component: ShortcutDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
