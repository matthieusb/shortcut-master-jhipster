import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    TrainingTypeService,
    TrainingTypeComponent,
    TrainingTypeDetailComponent,
    TrainingTypeUpdateComponent,
    TrainingTypeDeletePopupComponent,
    TrainingTypeDeleteDialogComponent,
    trainingTypeRoute,
    trainingTypePopupRoute,
    TrainingTypeResolve
} from './';

const ENTITY_STATES = [...trainingTypeRoute, ...trainingTypePopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainingTypeComponent,
        TrainingTypeDetailComponent,
        TrainingTypeUpdateComponent,
        TrainingTypeDeleteDialogComponent,
        TrainingTypeDeletePopupComponent
    ],
    entryComponents: [
        TrainingTypeComponent,
        TrainingTypeUpdateComponent,
        TrainingTypeDeleteDialogComponent,
        TrainingTypeDeletePopupComponent
    ],
    providers: [TrainingTypeService, TrainingTypeResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterTrainingTypeModule {}
