import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Shortcut } from 'app/shared/model/shortcut.model';
import { ShortcutService } from './shortcut.service';
import { ShortcutComponent } from './shortcut.component';
import { ShortcutDetailComponent } from './shortcut-detail.component';
import { ShortcutUpdateComponent } from './shortcut-update.component';
import { ShortcutDeletePopupComponent } from './shortcut-delete-dialog.component';

@Injectable()
export class ShortcutResolve implements Resolve<any> {
    constructor(private service: ShortcutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Shortcut();
    }
}

export const shortcutRoute: Routes = [
    {
        path: 'shortcut',
        component: ShortcutComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shortcut/:id/view',
        component: ShortcutDetailComponent,
        resolve: {
            shortcut: ShortcutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shortcut/new',
        component: ShortcutUpdateComponent,
        resolve: {
            shortcut: ShortcutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shortcut/:id/edit',
        component: ShortcutUpdateComponent,
        resolve: {
            shortcut: ShortcutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shortcutPopupRoute: Routes = [
    {
        path: 'shortcut/:id/delete',
        component: ShortcutDeletePopupComponent,
        resolve: {
            shortcut: ShortcutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.shortcut.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
