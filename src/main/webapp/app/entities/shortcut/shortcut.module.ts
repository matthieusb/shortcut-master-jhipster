import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from '../../shared';
import {
    ShortcutService,
    ShortcutPopupService,
    ShortcutComponent,
    ShortcutDetailComponent,
    ShortcutDialogComponent,
    ShortcutPopupComponent,
    ShortcutDeletePopupComponent,
    ShortcutDeleteDialogComponent,
    shortcutRoute,
    shortcutPopupRoute,
} from './';

const ENTITY_STATES = [
    ...shortcutRoute,
    ...shortcutPopupRoute,
];

@NgModule({
    imports: [
        ShortcutmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShortcutComponent,
        ShortcutDetailComponent,
        ShortcutDialogComponent,
        ShortcutDeleteDialogComponent,
        ShortcutPopupComponent,
        ShortcutDeletePopupComponent,
    ],
    entryComponents: [
        ShortcutComponent,
        ShortcutDialogComponent,
        ShortcutPopupComponent,
        ShortcutDeleteDialogComponent,
        ShortcutDeletePopupComponent,
    ],
    providers: [
        ShortcutService,
        ShortcutPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterShortcutModule {}
