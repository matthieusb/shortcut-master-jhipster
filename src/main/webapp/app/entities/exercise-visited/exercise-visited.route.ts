import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { ExerciseVisited } from 'app/shared/model/exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';
import { ExerciseVisitedComponent } from './exercise-visited.component';
import { ExerciseVisitedDetailComponent } from './exercise-visited-detail.component';
import { ExerciseVisitedUpdateComponent } from './exercise-visited-update.component';
import { ExerciseVisitedDeletePopupComponent } from './exercise-visited-delete-dialog.component';

@Injectable()
export class ExerciseVisitedResolve implements Resolve<any> {
    constructor(private service: ExerciseVisitedService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new ExerciseVisited();
    }
}

export const exerciseVisitedRoute: Routes = [
    {
        path: 'exercise-visited',
        component: ExerciseVisitedComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exercise-visited/:id/view',
        component: ExerciseVisitedDetailComponent,
        resolve: {
            exerciseVisited: ExerciseVisitedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exercise-visited/new',
        component: ExerciseVisitedUpdateComponent,
        resolve: {
            exerciseVisited: ExerciseVisitedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'exercise-visited/:id/edit',
        component: ExerciseVisitedUpdateComponent,
        resolve: {
            exerciseVisited: ExerciseVisitedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exerciseVisitedPopupRoute: Routes = [
    {
        path: 'exercise-visited/:id/delete',
        component: ExerciseVisitedDeletePopupComponent,
        resolve: {
            exerciseVisited: ExerciseVisitedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.exerciseVisited.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
