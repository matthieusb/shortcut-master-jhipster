import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Keystroke } from './keystroke.model';
import { KeystrokePopupService } from './keystroke-popup.service';
import { KeystrokeService } from './keystroke.service';
import { Shortcut, ShortcutService } from '../shortcut';

@Component({
    selector: 'jhi-keystroke-dialog',
    templateUrl: './keystroke-dialog.component.html'
})
export class KeystrokeDialogComponent implements OnInit {

    keystroke: Keystroke;
    isSaving: boolean;

    shortcuts: Shortcut[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private keystrokeService: KeystrokeService,
        private shortcutService: ShortcutService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.shortcutService.query()
            .subscribe((res: HttpResponse<Shortcut[]>) => { this.shortcuts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.keystroke.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keystrokeService.update(this.keystroke));
        } else {
            this.subscribeToSaveResponse(
                this.keystrokeService.create(this.keystroke));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Keystroke>>) {
        result.subscribe((res: HttpResponse<Keystroke>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Keystroke) {
        this.eventManager.broadcast({ name: 'keystrokeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackShortcutById(index: number, item: Shortcut) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-keystroke-popup',
    template: ''
})
export class KeystrokePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keystrokePopupService: KeystrokePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keystrokePopupService
                    .open(KeystrokeDialogComponent as Component, params['id']);
            } else {
                this.keystrokePopupService
                    .open(KeystrokeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
