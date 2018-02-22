import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    TrainingService,
    TrainingPopupService,
    TrainingComponent,
    TrainingDetailComponent,
    TrainingDialogComponent,
    TrainingPopupComponent,
    TrainingDeletePopupComponent,
    TrainingDeleteDialogComponent,
    trainingRoute,
    trainingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...trainingRoute,
    ...trainingPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrainingComponent,
        TrainingDetailComponent,
        TrainingDialogComponent,
        TrainingDeleteDialogComponent,
        TrainingPopupComponent,
        TrainingDeletePopupComponent,
    ],
    entryComponents: [
        TrainingComponent,
        TrainingDialogComponent,
        TrainingPopupComponent,
        TrainingDeleteDialogComponent,
        TrainingDeletePopupComponent,
    ],
    providers: [
        TrainingService,
        TrainingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterTrainingModule {}
