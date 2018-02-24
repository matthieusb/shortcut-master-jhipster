import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Shortcut } from './shortcut.model';
import { ShortcutPopupService } from './shortcut-popup.service';
import { ShortcutService } from './shortcut.service';

@Component({
    selector: 'jhi-shortcut-delete-dialog',
    templateUrl: './shortcut-delete-dialog.component.html'
})
export class ShortcutDeleteDialogComponent {

    shortcut: Shortcut;

    constructor(
        private shortcutService: ShortcutService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shortcutService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'shortcutListModification',
                content: 'Deleted an shortcut'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shortcut-delete-popup',
    template: ''
})
export class ShortcutDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shortcutPopupService: ShortcutPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shortcutPopupService
                .open(ShortcutDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
