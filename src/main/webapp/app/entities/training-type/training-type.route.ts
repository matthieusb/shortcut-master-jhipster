import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TrainingTypeComponent } from './training-type.component';
import { TrainingTypeDetailComponent } from './training-type-detail.component';
import { TrainingTypePopupComponent } from './training-type-dialog.component';
import { TrainingTypeDeletePopupComponent } from './training-type-delete-dialog.component';

export const trainingTypeRoute: Routes = [
    {
        path: 'training-type',
        component: TrainingTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'training-type/:id',
        component: TrainingTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingTypePopupRoute: Routes = [
    {
        path: 'training-type-new',
        component: TrainingTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'training-type/:id/edit',
        component: TrainingTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'training-type/:id/delete',
        component: TrainingTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
