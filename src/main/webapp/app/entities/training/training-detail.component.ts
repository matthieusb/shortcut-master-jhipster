import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITraining } from 'app/shared/model/training.model';

@Component({
    selector: 'jhi-training-detail',
    templateUrl: './training-detail.component.html'
})
export class TrainingDetailComponent implements OnInit {
    training: ITraining;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ training }) => {
            this.training = training.body ? training.body : training;
        });
    }

    previousState() {
        window.history.back();
    }
}
