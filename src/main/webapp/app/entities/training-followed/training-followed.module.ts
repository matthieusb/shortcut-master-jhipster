import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    TrainingFollowedService,
    TrainingFollowedPopupService,
    TrainingFollowedComponent,
    TrainingFollowedDetailComponent,
    TrainingFollowedDialogComponent,
    TrainingFollowedPopupComponent,
    TrainingFollowedDeletePopupComponent,
    TrainingFollowedDeleteDialogComponent,
    trainingFollowedRoute,
    trainingFollowedPopupRoute,
} from './';

const ENTITY_STATES = [
    ...trainingFollowedRoute,
    ...trainingFollowedPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrainingFollowedComponent,
        TrainingFollowedDetailComponent,
        TrainingFollowedDialogComponent,
        TrainingFollowedDeleteDialogComponent,
        TrainingFollowedPopupComponent,
        TrainingFollowedDeletePopupComponent,
    ],
    entryComponents: [
        TrainingFollowedComponent,
        TrainingFollowedDialogComponent,
        TrainingFollowedPopupComponent,
        TrainingFollowedDeleteDialogComponent,
        TrainingFollowedDeletePopupComponent,
    ],
    providers: [
        TrainingFollowedService,
        TrainingFollowedPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterTrainingFollowedModule {}
