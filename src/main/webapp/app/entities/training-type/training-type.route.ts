import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { TrainingType } from 'app/shared/model/training-type.model';
import { TrainingTypeService } from './training-type.service';
import { TrainingTypeComponent } from './training-type.component';
import { TrainingTypeDetailComponent } from './training-type-detail.component';
import { TrainingTypeUpdateComponent } from './training-type-update.component';
import { TrainingTypeDeletePopupComponent } from './training-type-delete-dialog.component';

@Injectable()
export class TrainingTypeResolve implements Resolve<any> {
    constructor(private service: TrainingTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new TrainingType();
    }
}

export const trainingTypeRoute: Routes = [
    {
        path: 'training-type',
        component: TrainingTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-type/:id/view',
        component: TrainingTypeDetailComponent,
        resolve: {
            trainingType: TrainingTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-type/new',
        component: TrainingTypeUpdateComponent,
        resolve: {
            trainingType: TrainingTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-type/:id/edit',
        component: TrainingTypeUpdateComponent,
        resolve: {
            trainingType: TrainingTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingTypePopupRoute: Routes = [
    {
        path: 'training-type/:id/delete',
        component: TrainingTypeDeletePopupComponent,
        resolve: {
            trainingType: TrainingTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
