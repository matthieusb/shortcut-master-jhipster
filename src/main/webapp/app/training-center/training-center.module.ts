import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../shared';
import { TrainingsComponent } from './trainings/trainings.component';

import {
    trainingCenterState
} from './';

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(trainingCenterState)
    ],
    declarations: [
        TrainingsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingCenterModule { }
