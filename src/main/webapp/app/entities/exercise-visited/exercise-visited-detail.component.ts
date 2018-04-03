import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExerciseVisited } from 'app/shared/model/exercise-visited.model';

@Component({
    selector: 'jhi-exercise-visited-detail',
    templateUrl: './exercise-visited-detail.component.html'
})
export class ExerciseVisitedDetailComponent implements OnInit {
    exerciseVisited: IExerciseVisited;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ exerciseVisited }) => {
            this.exerciseVisited = exerciseVisited.body ? exerciseVisited.body : exerciseVisited;
        });
    }

    previousState() {
        window.history.back();
    }
}
