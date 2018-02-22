import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Shortcut } from './shortcut.model';
import { ShortcutPopupService } from './shortcut-popup.service';
import { ShortcutService } from './shortcut.service';

@Component({
    selector: 'jhi-shortcut-dialog',
    templateUrl: './shortcut-dialog.component.html'
})
export class ShortcutDialogComponent implements OnInit {

    shortcut: Shortcut;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private shortcutService: ShortcutService,
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
        if (this.shortcut.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shortcutService.update(this.shortcut));
        } else {
            this.subscribeToSaveResponse(
                this.shortcutService.create(this.shortcut));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Shortcut>>) {
        result.subscribe((res: HttpResponse<Shortcut>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Shortcut) {
        this.eventManager.broadcast({ name: 'shortcutListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-shortcut-popup',
    template: ''
})
export class ShortcutPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shortcutPopupService: ShortcutPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shortcutPopupService
                    .open(ShortcutDialogComponent as Component, params['id']);
            } else {
                this.shortcutPopupService
                    .open(ShortcutDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
