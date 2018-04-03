import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainingFollowed } from 'app/shared/model/training-followed.model';

@Component({
    selector: 'jhi-training-followed-detail',
    templateUrl: './training-followed-detail.component.html'
})
export class TrainingFollowedDetailComponent implements OnInit {
    trainingFollowed: ITrainingFollowed;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ trainingFollowed }) => {
            this.trainingFollowed = trainingFollowed.body ? trainingFollowed.body : trainingFollowed;
        });
    }

    previousState() {
        window.history.back();
    }
}
