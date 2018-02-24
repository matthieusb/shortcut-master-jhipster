import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    KeystrokeService,
    KeystrokePopupService,
    KeystrokeComponent,
    KeystrokeDetailComponent,
    KeystrokeDialogComponent,
    KeystrokePopupComponent,
    KeystrokeDeletePopupComponent,
    KeystrokeDeleteDialogComponent,
    keystrokeRoute,
    keystrokePopupRoute,
} from './';

const ENTITY_STATES = [
    ...keystrokeRoute,
    ...keystrokePopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeystrokeComponent,
        KeystrokeDetailComponent,
        KeystrokeDialogComponent,
        KeystrokeDeleteDialogComponent,
        KeystrokePopupComponent,
        KeystrokeDeletePopupComponent,
    ],
    entryComponents: [
        KeystrokeComponent,
        KeystrokeDialogComponent,
        KeystrokePopupComponent,
        KeystrokeDeleteDialogComponent,
        KeystrokeDeletePopupComponent,
    ],
    providers: [
        KeystrokeService,
        KeystrokePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterKeystrokeModule {}
