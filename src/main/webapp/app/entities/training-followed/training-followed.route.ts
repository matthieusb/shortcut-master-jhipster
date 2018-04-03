import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { TrainingFollowed } from 'app/shared/model/training-followed.model';
import { TrainingFollowedService } from './training-followed.service';
import { TrainingFollowedComponent } from './training-followed.component';
import { TrainingFollowedDetailComponent } from './training-followed-detail.component';
import { TrainingFollowedUpdateComponent } from './training-followed-update.component';
import { TrainingFollowedDeletePopupComponent } from './training-followed-delete-dialog.component';

@Injectable()
export class TrainingFollowedResolve implements Resolve<any> {
    constructor(private service: TrainingFollowedService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new TrainingFollowed();
    }
}

export const trainingFollowedRoute: Routes = [
    {
        path: 'training-followed',
        component: TrainingFollowedComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-followed/:id/view',
        component: TrainingFollowedDetailComponent,
        resolve: {
            trainingFollowed: TrainingFollowedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-followed/new',
        component: TrainingFollowedUpdateComponent,
        resolve: {
            trainingFollowed: TrainingFollowedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training-followed/:id/edit',
        component: TrainingFollowedUpdateComponent,
        resolve: {
            trainingFollowed: TrainingFollowedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingFollowedPopupRoute: Routes = [
    {
        path: 'training-followed/:id/delete',
        component: TrainingFollowedDeletePopupComponent,
        resolve: {
            trainingFollowed: TrainingFollowedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.trainingFollowed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
