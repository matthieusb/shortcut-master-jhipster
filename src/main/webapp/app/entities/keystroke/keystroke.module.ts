import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    KeystrokeService,
    KeystrokeComponent,
    KeystrokeDetailComponent,
    KeystrokeUpdateComponent,
    KeystrokeDeletePopupComponent,
    KeystrokeDeleteDialogComponent,
    keystrokeRoute,
    keystrokePopupRoute,
    KeystrokeResolve
} from './';

const ENTITY_STATES = [...keystrokeRoute, ...keystrokePopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        KeystrokeComponent,
        KeystrokeDetailComponent,
        KeystrokeUpdateComponent,
        KeystrokeDeleteDialogComponent,
        KeystrokeDeletePopupComponent
    ],
    entryComponents: [KeystrokeComponent, KeystrokeUpdateComponent, KeystrokeDeleteDialogComponent, KeystrokeDeletePopupComponent],
    providers: [KeystrokeService, KeystrokeResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterKeystrokeModule {}
