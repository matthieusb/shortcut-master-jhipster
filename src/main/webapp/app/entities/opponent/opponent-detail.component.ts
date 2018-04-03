import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpponent } from 'app/shared/model/opponent.model';

@Component({
    selector: 'jhi-opponent-detail',
    templateUrl: './opponent-detail.component.html'
})
export class OpponentDetailComponent implements OnInit {
    opponent: IOpponent;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ opponent }) => {
            this.opponent = opponent.body ? opponent.body : opponent;
        });
    }

    previousState() {
        window.history.back();
    }
}
