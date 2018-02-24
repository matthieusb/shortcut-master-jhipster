import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TrainingFollowedComponent } from './training-followed.component';
import { TrainingFollowedDetailComponent } from './training-followed-detail.component';
import { TrainingFollowedPopupComponent } from './training-followed-dialog.component';
import { TrainingFollowedDeletePopupComponent } from './training-followed-delete-dialog.component';

export const trainingFollowedRoute: Routes = [
    {
        path: 'training-followed',
        component: TrainingFollowedComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'training-followed/:id',
        component: TrainingFollowedDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingFollowedPopupRoute: Routes = [
    {
        path: 'training-followed-new',
        component: TrainingFollowedPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'training-followed/:id/edit',
        component: TrainingFollowedPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'training-followed/:id/delete',
        component: TrainingFollowedDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
