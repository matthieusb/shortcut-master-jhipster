import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionUpdateComponent } from './question-update.component';
import { QuestionDeletePopupComponent } from './question-delete-dialog.component';

@Injectable()
export class QuestionResolve implements Resolve<any> {
    constructor(private service: QuestionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Question();
    }
}

export const questionRoute: Routes = [
    {
        path: 'question',
        component: QuestionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.question.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'question/:id/view',
        component: QuestionDetailComponent,
        resolve: {
            question: QuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.question.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'question/new',
        component: QuestionUpdateComponent,
        resolve: {
            question: QuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.question.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'question/:id/edit',
        component: QuestionUpdateComponent,
        resolve: {
            question: QuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.question.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const questionPopupRoute: Routes = [
    {
        path: 'question/:id/delete',
        component: QuestionDeletePopupComponent,
        resolve: {
            question: QuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shortcutmasterApp.question.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
