import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    OpponentService,
    OpponentComponent,
    OpponentDetailComponent,
    OpponentUpdateComponent,
    OpponentDeletePopupComponent,
    OpponentDeleteDialogComponent,
    opponentRoute,
    opponentPopupRoute,
    OpponentResolve
} from './';

const ENTITY_STATES = [...opponentRoute, ...opponentPopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OpponentComponent,
        OpponentDetailComponent,
        OpponentUpdateComponent,
        OpponentDeleteDialogComponent,
        OpponentDeletePopupComponent
    ],
    entryComponents: [OpponentComponent, OpponentUpdateComponent, OpponentDeleteDialogComponent, OpponentDeletePopupComponent],
    providers: [OpponentService, OpponentResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterOpponentModule {}
