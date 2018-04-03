import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainingType } from 'app/shared/model/training-type.model';

@Component({
    selector: 'jhi-training-type-detail',
    templateUrl: './training-type-detail.component.html'
})
export class TrainingTypeDetailComponent implements OnInit {
    trainingType: ITrainingType;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ trainingType }) => {
            this.trainingType = trainingType.body ? trainingType.body : trainingType;
        });
    }

    previousState() {
        window.history.back();
    }
}
