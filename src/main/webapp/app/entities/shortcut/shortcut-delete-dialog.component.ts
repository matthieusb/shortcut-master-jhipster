import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShortcut } from 'app/shared/model/shortcut.model';
import { ShortcutService } from './shortcut.service';

@Component({
    selector: 'jhi-shortcut-delete-dialog',
    templateUrl: './shortcut-delete-dialog.component.html'
})
export class ShortcutDeleteDialogComponent {
    shortcut: IShortcut;

    constructor(private shortcutService: ShortcutService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shortcutService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ shortcut }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShortcutDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.shortcut = shortcut.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
