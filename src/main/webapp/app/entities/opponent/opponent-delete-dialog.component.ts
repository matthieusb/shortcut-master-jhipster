import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Opponent } from './opponent.model';
import { OpponentPopupService } from './opponent-popup.service';
import { OpponentService } from './opponent.service';

@Component({
    selector: 'jhi-opponent-delete-dialog',
    templateUrl: './opponent-delete-dialog.component.html'
})
export class OpponentDeleteDialogComponent {

    opponent: Opponent;

    constructor(
        private opponentService: OpponentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opponentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opponentListModification',
                content: 'Deleted an opponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opponent-delete-popup',
    template: ''
})
export class OpponentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opponentPopupService: OpponentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.opponentPopupService
                .open(OpponentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
