import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Opponent } from 'app/shared/model/opponent.model';
import { OpponentService } from './opponent.service';
import { OpponentComponent } from './opponent.component';
import { OpponentDetailComponent } from './opponent-detail.component';
import { OpponentUpdateComponent } from './opponent-update.component';
import { OpponentDeletePopupComponent } from './opponent-delete-dialog.component';

@Injectable()
export class OpponentResolve implements Resolve<any> {
    constructor(private service: OpponentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Opponent();
    }
}

export const opponentRoute: Routes = [
    {
        path: 'opponent',
        component: OpponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'opponent/:id/view',
        component: OpponentDetailComponent,
        resolve: {
            opponent: OpponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'opponent/new',
        component: OpponentUpdateComponent,
        resolve: {
            opponent: OpponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'opponent/:id/edit',
        component: OpponentUpdateComponent,
        resolve: {
            opponent: OpponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opponentPopupRoute: Routes = [
    {
        path: 'opponent/:id/delete',
        component: OpponentDeletePopupComponent,
        resolve: {
            opponent: OpponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.opponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
