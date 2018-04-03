import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Keystroke } from 'app/shared/model/keystroke.model';
import { KeystrokeService } from './keystroke.service';
import { KeystrokeComponent } from './keystroke.component';
import { KeystrokeDetailComponent } from './keystroke-detail.component';
import { KeystrokeUpdateComponent } from './keystroke-update.component';
import { KeystrokeDeletePopupComponent } from './keystroke-delete-dialog.component';

@Injectable()
export class KeystrokeResolve implements Resolve<any> {
    constructor(private service: KeystrokeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Keystroke();
    }
}

export const keystrokeRoute: Routes = [
    {
        path: 'keystroke',
        component: KeystrokeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keystroke/:id/view',
        component: KeystrokeDetailComponent,
        resolve: {
            keystroke: KeystrokeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keystroke/new',
        component: KeystrokeUpdateComponent,
        resolve: {
            keystroke: KeystrokeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keystroke/:id/edit',
        component: KeystrokeUpdateComponent,
        resolve: {
            keystroke: KeystrokeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keystrokePopupRoute: Routes = [
    {
        path: 'keystroke/:id/delete',
        component: KeystrokeDeletePopupComponent,
        resolve: {
            keystroke: KeystrokeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.keystroke.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
