import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrainingType } from 'app/shared/model/training-type.model';
import { TrainingTypeService } from './training-type.service';

@Component({
    selector: 'jhi-training-type-delete-dialog',
    templateUrl: './training-type-delete-dialog.component.html'
})
export class TrainingTypeDeleteDialogComponent {
    trainingType: ITrainingType;

    constructor(
        private trainingTypeService: TrainingTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainingTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trainingTypeListModification',
                content: 'Deleted an trainingType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-training-type-delete-popup',
    template: ''
})
export class TrainingTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ trainingType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrainingTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.trainingType = trainingType.body;
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
