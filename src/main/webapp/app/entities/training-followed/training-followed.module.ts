import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    TrainingFollowedService,
    TrainingFollowedComponent,
    TrainingFollowedDetailComponent,
    TrainingFollowedUpdateComponent,
    TrainingFollowedDeletePopupComponent,
    TrainingFollowedDeleteDialogComponent,
    trainingFollowedRoute,
    trainingFollowedPopupRoute,
    TrainingFollowedResolve
} from './';

const ENTITY_STATES = [...trainingFollowedRoute, ...trainingFollowedPopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainingFollowedComponent,
        TrainingFollowedDetailComponent,
        TrainingFollowedUpdateComponent,
        TrainingFollowedDeleteDialogComponent,
        TrainingFollowedDeletePopupComponent
    ],
    entryComponents: [
        TrainingFollowedComponent,
        TrainingFollowedUpdateComponent,
        TrainingFollowedDeleteDialogComponent,
        TrainingFollowedDeletePopupComponent
    ],
    providers: [TrainingFollowedService, TrainingFollowedResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterTrainingFollowedModule {}
