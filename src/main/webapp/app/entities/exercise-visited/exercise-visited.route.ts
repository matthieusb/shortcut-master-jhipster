import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExerciseVisitedComponent } from './exercise-visited.component';
import { ExerciseVisitedDetailComponent } from './exercise-visited-detail.component';
import { ExerciseVisitedPopupComponent } from './exercise-visited-dialog.component';
import { ExerciseVisitedDeletePopupComponent } from './exercise-visited-delete-dialog.component';

export const exerciseVisitedRoute: Routes = [
    {
        path: 'exercise-visited',
        component: ExerciseVisitedComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'exercise-visited/:id',
        component: ExerciseVisitedDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exerciseVisitedPopupRoute: Routes = [
    {
        path: 'exercise-visited-new',
        component: ExerciseVisitedPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exercise-visited/:id/edit',
        component: ExerciseVisitedPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'exercise-visited/:id/delete',
        component: ExerciseVisitedDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
