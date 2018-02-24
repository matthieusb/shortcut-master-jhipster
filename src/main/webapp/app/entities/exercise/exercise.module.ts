import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    ExerciseService,
    ExercisePopupService,
    ExerciseComponent,
    ExerciseDetailComponent,
    ExerciseDialogComponent,
    ExercisePopupComponent,
    ExerciseDeletePopupComponent,
    ExerciseDeleteDialogComponent,
    exerciseRoute,
    exercisePopupRoute,
} from './';

const ENTITY_STATES = [
    ...exerciseRoute,
    ...exercisePopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExerciseComponent,
        ExerciseDetailComponent,
        ExerciseDialogComponent,
        ExerciseDeleteDialogComponent,
        ExercisePopupComponent,
        ExerciseDeletePopupComponent,
    ],
    entryComponents: [
        ExerciseComponent,
        ExerciseDialogComponent,
        ExercisePopupComponent,
        ExerciseDeleteDialogComponent,
        ExerciseDeletePopupComponent,
    ],
    providers: [
        ExerciseService,
        ExercisePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterExerciseModule {}
