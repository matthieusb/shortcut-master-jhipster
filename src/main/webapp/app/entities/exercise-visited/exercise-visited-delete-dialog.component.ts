import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExerciseVisited } from 'app/shared/model/exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';

@Component({
    selector: 'jhi-exercise-visited-delete-dialog',
    templateUrl: './exercise-visited-delete-dialog.component.html'
})
export class ExerciseVisitedDeleteDialogComponent {
    exerciseVisited: IExerciseVisited;

    constructor(
        private exerciseVisitedService: ExerciseVisitedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exerciseVisitedService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exerciseVisitedListModification',
                content: 'Deleted an exerciseVisited'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-exercise-visited-delete-popup',
    template: ''
})
export class ExerciseVisitedDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ exerciseVisited }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExerciseVisitedDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.exerciseVisited = exerciseVisited.body;
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
