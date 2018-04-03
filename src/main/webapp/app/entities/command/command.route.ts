import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { CommandComponent } from './command.component';
import { CommandDetailComponent } from './command-detail.component';
import { CommandUpdateComponent } from './command-update.component';
import { CommandDeletePopupComponent } from './command-delete-dialog.component';

@Injectable()
export class CommandResolve implements Resolve<any> {
    constructor(private service: CommandService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Command();
    }
}

export const commandRoute: Routes = [
    {
        path: 'command',
        component: CommandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'command/:id/view',
        component: CommandDetailComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'command/new',
        component: CommandUpdateComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'command/:id/edit',
        component: CommandUpdateComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commandPopupRoute: Routes = [
    {
        path: 'command/:id/delete',
        component: CommandDeletePopupComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.command.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
