import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    ExerciseVisitedService,
    ExerciseVisitedComponent,
    ExerciseVisitedDetailComponent,
    ExerciseVisitedUpdateComponent,
    ExerciseVisitedDeletePopupComponent,
    ExerciseVisitedDeleteDialogComponent,
    exerciseVisitedRoute,
    exerciseVisitedPopupRoute,
    ExerciseVisitedResolve
} from './';

const ENTITY_STATES = [...exerciseVisitedRoute, ...exerciseVisitedPopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExerciseVisitedComponent,
        ExerciseVisitedDetailComponent,
        ExerciseVisitedUpdateComponent,
        ExerciseVisitedDeleteDialogComponent,
        ExerciseVisitedDeletePopupComponent
    ],
    entryComponents: [
        ExerciseVisitedComponent,
        ExerciseVisitedUpdateComponent,
        ExerciseVisitedDeleteDialogComponent,
        ExerciseVisitedDeletePopupComponent
    ],
    providers: [ExerciseVisitedService, ExerciseVisitedResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterExerciseVisitedModule {}
