import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Command } from './command.model';
import { CommandPopupService } from './command-popup.service';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command-dialog',
    templateUrl: './command-dialog.component.html'
})
export class CommandDialogComponent implements OnInit {

    command: Command;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private commandService: CommandService,
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
        if (this.command.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commandService.update(this.command));
        } else {
            this.subscribeToSaveResponse(
                this.commandService.create(this.command));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Command>>) {
        result.subscribe((res: HttpResponse<Command>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Command) {
        this.eventManager.broadcast({ name: 'commandListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-command-popup',
    template: ''
})
export class CommandPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandPopupService: CommandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commandPopupService
                    .open(CommandDialogComponent as Component, params['id']);
            } else {
                this.commandPopupService
                    .open(CommandDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
