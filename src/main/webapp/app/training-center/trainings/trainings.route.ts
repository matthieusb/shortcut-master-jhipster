import { Route } from '@angular/router';

import { TrainingsComponent } from './trainings.component';

import {
    /* Import children routes here */
} from './';

const TRAININGS_ROUTES = [
    /* Add imported children routes here */
];

export const trainingsRoute: Route = {
    path: 'trainings',
    component: TrainingsComponent,
    children: TRAININGS_ROUTES
};
