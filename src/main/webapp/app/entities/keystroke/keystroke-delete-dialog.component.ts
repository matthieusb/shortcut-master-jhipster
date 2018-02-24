import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Keystroke } from './keystroke.model';
import { KeystrokePopupService } from './keystroke-popup.service';
import { KeystrokeService } from './keystroke.service';

@Component({
    selector: 'jhi-keystroke-delete-dialog',
    templateUrl: './keystroke-delete-dialog.component.html'
})
export class KeystrokeDeleteDialogComponent {

    keystroke: Keystroke;

    constructor(
        private keystrokeService: KeystrokeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keystrokeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keystrokeListModification',
                content: 'Deleted an keystroke'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-keystroke-delete-popup',
    template: ''
})
export class KeystrokeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keystrokePopupService: KeystrokePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keystrokePopupService
                .open(KeystrokeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
