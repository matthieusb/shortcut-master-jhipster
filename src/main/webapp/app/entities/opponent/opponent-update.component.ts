import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IOpponent } from 'app/shared/model/opponent.model';
import { OpponentService } from './opponent.service';

@Component({
    selector: 'jhi-opponent-update',
    templateUrl: './opponent-update.component.html'
})
export class OpponentUpdateComponent implements OnInit {
    private _opponent: IOpponent;
    isSaving: boolean;

    constructor(private opponentService: OpponentService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ opponent }) => {
            this.opponent = opponent.body ? opponent.body : opponent;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.opponent.id !== undefined) {
            this.subscribeToSaveResponse(this.opponentService.update(this.opponent));
        } else {
            this.subscribeToSaveResponse(this.opponentService.create(this.opponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOpponent>>) {
        result.subscribe((res: HttpResponse<IOpponent>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IOpponent) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get opponent() {
        return this._opponent;
    }

    set opponent(opponent: IOpponent) {
        this._opponent = opponent;
    }
}
