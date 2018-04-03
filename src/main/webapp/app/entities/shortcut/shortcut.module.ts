import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    ShortcutService,
    ShortcutComponent,
    ShortcutDetailComponent,
    ShortcutUpdateComponent,
    ShortcutDeletePopupComponent,
    ShortcutDeleteDialogComponent,
    shortcutRoute,
    shortcutPopupRoute,
    ShortcutResolve
} from './';

const ENTITY_STATES = [...shortcutRoute, ...shortcutPopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShortcutComponent,
        ShortcutDetailComponent,
        ShortcutUpdateComponent,
        ShortcutDeleteDialogComponent,
        ShortcutDeletePopupComponent
    ],
    entryComponents: [ShortcutComponent, ShortcutUpdateComponent, ShortcutDeleteDialogComponent, ShortcutDeletePopupComponent],
    providers: [ShortcutService, ShortcutResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterShortcutModule {}
