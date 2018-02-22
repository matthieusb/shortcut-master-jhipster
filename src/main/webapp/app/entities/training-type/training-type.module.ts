import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    TrainingTypeService,
    TrainingTypePopupService,
    TrainingTypeComponent,
    TrainingTypeDetailComponent,
    TrainingTypeDialogComponent,
    TrainingTypePopupComponent,
    TrainingTypeDeletePopupComponent,
    TrainingTypeDeleteDialogComponent,
    trainingTypeRoute,
    trainingTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...trainingTypeRoute,
    ...trainingTypePopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrainingTypeComponent,
        TrainingTypeDetailComponent,
        TrainingTypeDialogComponent,
        TrainingTypeDeleteDialogComponent,
        TrainingTypePopupComponent,
        TrainingTypeDeletePopupComponent,
    ],
    entryComponents: [
        TrainingTypeComponent,
        TrainingTypeDialogComponent,
        TrainingTypePopupComponent,
        TrainingTypeDeleteDialogComponent,
        TrainingTypeDeletePopupComponent,
    ],
    providers: [
        TrainingTypeService,
        TrainingTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterTrainingTypeModule {}
