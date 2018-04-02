import { Routes } from '@angular/router';

import {
    trainingsRoute
} from './';

const TRAINING_CENTER_ROUTES = [
    trainingsRoute
];

export const trainingCenterState: Routes = [{
    path: '',
    children: TRAINING_CENTER_ROUTES
}];
