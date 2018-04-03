import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShortcutmasterKeystrokeModule } from './keystroke/keystroke.module';
import { ShortcutmasterShortcutModule } from './shortcut/shortcut.module';
import { ShortcutmasterCommandModule } from './command/command.module';
import { ShortcutmasterQuestionModule } from './question/question.module';
import { ShortcutmasterExerciseModule } from './exercise/exercise.module';
import { ShortcutmasterExerciseVisitedModule } from './exercise-visited/exercise-visited.module';
import { ShortcutmasterOpponentModule } from './opponent/opponent.module';
import { ShortcutmasterTrainingModule } from './training/training.module';
import { ShortcutmasterTrainingTypeModule } from './training-type/training-type.module';
import { ShortcutmasterTrainingFollowedModule } from './training-followed/training-followed.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ShortcutmasterKeystrokeModule,
        ShortcutmasterShortcutModule,
        ShortcutmasterCommandModule,
        ShortcutmasterQuestionModule,
        ShortcutmasterExerciseModule,
        ShortcutmasterExerciseVisitedModule,
        ShortcutmasterOpponentModule,
        ShortcutmasterTrainingModule,
        ShortcutmasterTrainingTypeModule,
        ShortcutmasterTrainingFollowedModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortcutmasterEntityModule {}
