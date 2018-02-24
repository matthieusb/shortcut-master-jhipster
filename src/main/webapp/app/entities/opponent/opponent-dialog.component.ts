import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Opponent } from './opponent.model';
import { OpponentPopupService } from './opponent-popup.service';
import { OpponentService } from './opponent.service';

@Component({
    selector: 'jhi-opponent-dialog',
    templateUrl: './opponent-dialog.component.html'
})
export class OpponentDialogComponent implements OnInit {

    opponent: Opponent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private opponentService: OpponentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.opponent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opponentService.update(this.opponent));
        } else {
            this.subscribeToSaveResponse(
                this.opponentService.create(this.opponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Opponent>>) {
        result.subscribe((res: HttpResponse<Opponent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Opponent) {
        this.eventManager.broadcast({ name: 'opponentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-opponent-popup',
    template: ''
})
export class OpponentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opponentPopupService: OpponentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.opponentPopupService
                    .open(OpponentDialogComponent as Component, params['id']);
            } else {
                this.opponentPopupService
                    .open(OpponentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
