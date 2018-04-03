import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrainingFollowed } from 'app/shared/model/training-followed.model';
import { TrainingFollowedService } from './training-followed.service';

@Component({
    selector: 'jhi-training-followed-delete-dialog',
    templateUrl: './training-followed-delete-dialog.component.html'
})
export class TrainingFollowedDeleteDialogComponent {
    trainingFollowed: ITrainingFollowed;

    constructor(
        private trainingFollowedService: TrainingFollowedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainingFollowedService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trainingFollowedListModification',
                content: 'Deleted an trainingFollowed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-training-followed-delete-popup',
    template: ''
})
export class TrainingFollowedDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ trainingFollowed }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrainingFollowedDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.trainingFollowed = trainingFollowed.body;
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
