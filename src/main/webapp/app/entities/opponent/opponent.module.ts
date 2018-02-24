import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    OpponentService,
    OpponentPopupService,
    OpponentComponent,
    OpponentDetailComponent,
    OpponentDialogComponent,
    OpponentPopupComponent,
    OpponentDeletePopupComponent,
    OpponentDeleteDialogComponent,
    opponentRoute,
    opponentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...opponentRoute,
    ...opponentPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OpponentComponent,
        OpponentDetailComponent,
        OpponentDialogComponent,
        OpponentDeleteDialogComponent,
        OpponentPopupComponent,
        OpponentDeletePopupComponent,
    ],
    entryComponents: [
        OpponentComponent,
        OpponentDialogComponent,
        OpponentPopupComponent,
        OpponentDeleteDialogComponent,
        OpponentDeletePopupComponent,
    ],
    providers: [
        OpponentService,
        OpponentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterOpponentModule {}
