import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeystroke } from 'app/shared/model/keystroke.model';
import { KeystrokeService } from './keystroke.service';

@Component({
    selector: 'jhi-keystroke-delete-dialog',
    templateUrl: './keystroke-delete-dialog.component.html'
})
export class KeystrokeDeleteDialogComponent {
    keystroke: IKeystroke;

    constructor(private keystrokeService: KeystrokeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keystrokeService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ keystroke }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KeystrokeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.keystroke = keystroke.body;
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
