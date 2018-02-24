import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    QuestionService,
    QuestionPopupService,
    QuestionComponent,
    QuestionDetailComponent,
    QuestionDialogComponent,
    QuestionPopupComponent,
    QuestionDeletePopupComponent,
    QuestionDeleteDialogComponent,
    questionRoute,
    questionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...questionRoute,
    ...questionPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuestionComponent,
        QuestionDetailComponent,
        QuestionDialogComponent,
        QuestionDeleteDialogComponent,
        QuestionPopupComponent,
        QuestionDeletePopupComponent,
    ],
    entryComponents: [
        QuestionComponent,
        QuestionDialogComponent,
        QuestionPopupComponent,
        QuestionDeleteDialogComponent,
        QuestionDeletePopupComponent,
    ],
    providers: [
        QuestionService,
        QuestionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterQuestionModule {}
