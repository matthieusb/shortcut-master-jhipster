import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutmasterSharedModule } from 'app/shared';
import {
    CommandService,
    CommandComponent,
    CommandDetailComponent,
    CommandUpdateComponent,
    CommandDeletePopupComponent,
    CommandDeleteDialogComponent,
    commandRoute,
    commandPopupRoute,
    CommandResolve
} from './';

const ENTITY_STATES = [...commandRoute, ...commandPopupRoute];

@NgModule({
    imports: [ShortcutmasterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommandComponent,
        CommandDetailComponent,
        CommandUpdateComponent,
        CommandDeleteDialogComponent,
        CommandDeletePopupComponent
    ],
    entryComponents: [CommandComponent, CommandUpdateComponent, CommandDeleteDialogComponent, CommandDeletePopupComponent],
    providers: [CommandService, CommandResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterCommandModule {}
