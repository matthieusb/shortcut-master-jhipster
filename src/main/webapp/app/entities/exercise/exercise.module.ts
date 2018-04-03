import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    ExerciseService,
    ExerciseComponent,
    ExerciseDetailComponent,
    ExerciseUpdateComponent,
    ExerciseDeletePopupComponent,
    ExerciseDeleteDialogComponent,
    exerciseRoute,
    exercisePopupRoute,
    ExerciseResolve
} from './';

const ENTITY_STATES = [...exerciseRoute, ...exercisePopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExerciseComponent,
        ExerciseDetailComponent,
        ExerciseUpdateComponent,
        ExerciseDeleteDialogComponent,
        ExerciseDeletePopupComponent
    ],
    entryComponents: [ExerciseComponent, ExerciseUpdateComponent, ExerciseDeleteDialogComponent, ExerciseDeletePopupComponent],
    providers: [ExerciseService, ExerciseResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterExerciseModule {}
