import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExercise } from 'app/shared/model/exercise.model';

@Component({
    selector: 'jhi-exercise-detail',
    templateUrl: './exercise-detail.component.html'
})
export class ExerciseDetailComponent implements OnInit {
    exercise: IExercise;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ exercise }) => {
            this.exercise = exercise.body ? exercise.body : exercise;
        });
    }

    previousState() {
        window.history.back();
    }
}
