import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KeystrokeComponent } from './keystroke.component';
import { KeystrokeDetailComponent } from './keystroke-detail.component';
import { KeystrokePopupComponent } from './keystroke-dialog.component';
import { KeystrokeDeletePopupComponent } from './keystroke-delete-dialog.component';

export const keystrokeRoute: Routes = [
    {
        path: 'keystroke',
        component: KeystrokeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'keystroke/:id',
        component: KeystrokeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keystrokePopupRoute: Routes = [
    {
        path: 'keystroke-new',
        component: KeystrokePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keystroke/:id/edit',
        component: KeystrokePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keystroke/:id/delete',
        component: KeystrokeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
