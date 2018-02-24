import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    ExerciseVisitedService,
    ExerciseVisitedPopupService,
    ExerciseVisitedComponent,
    ExerciseVisitedDetailComponent,
    ExerciseVisitedDialogComponent,
    ExerciseVisitedPopupComponent,
    ExerciseVisitedDeletePopupComponent,
    ExerciseVisitedDeleteDialogComponent,
    exerciseVisitedRoute,
    exerciseVisitedPopupRoute,
} from './';

const ENTITY_STATES = [
    ...exerciseVisitedRoute,
    ...exerciseVisitedPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExerciseVisitedComponent,
        ExerciseVisitedDetailComponent,
        ExerciseVisitedDialogComponent,
        ExerciseVisitedDeleteDialogComponent,
        ExerciseVisitedPopupComponent,
        ExerciseVisitedDeletePopupComponent,
    ],
    entryComponents: [
        ExerciseVisitedComponent,
        ExerciseVisitedDialogComponent,
        ExerciseVisitedPopupComponent,
        ExerciseVisitedDeleteDialogComponent,
        ExerciseVisitedDeletePopupComponent,
    ],
    providers: [
        ExerciseVisitedService,
        ExerciseVisitedPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterExerciseVisitedModule {}
