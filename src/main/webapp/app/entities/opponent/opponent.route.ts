import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OpponentComponent } from './opponent.component';
import { OpponentDetailComponent } from './opponent-detail.component';
import { OpponentPopupComponent } from './opponent-dialog.component';
import { OpponentDeletePopupComponent } from './opponent-delete-dialog.component';

export const opponentRoute: Routes = [
    {
        path: 'opponent',
        component: OpponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opponent/:id',
        component: OpponentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opponentPopupRoute: Routes = [
    {
        path: 'opponent-new',
        component: OpponentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opponent/:id/edit',
        component: OpponentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opponent/:id/delete',
        component: OpponentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
