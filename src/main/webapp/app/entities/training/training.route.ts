import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Training } from 'app/shared/model/training.model';
import { TrainingService } from './training.service';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingUpdateComponent } from './training-update.component';
import { TrainingDeletePopupComponent } from './training-delete-dialog.component';

@Injectable()
export class TrainingResolve implements Resolve<any> {
    constructor(private service: TrainingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Training();
    }
}

export const trainingRoute: Routes = [
    {
        path: 'training',
        component: TrainingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/:id/view',
        component: TrainingDetailComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/new',
        component: TrainingUpdateComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/:id/edit',
        component: TrainingUpdateComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingPopupRoute: Routes = [
    {
        path: 'training/:id/delete',
        component: TrainingDeletePopupComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.training.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
