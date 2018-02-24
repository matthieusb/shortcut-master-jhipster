import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExerciseVisited } from './exercise-visited.model';
import { ExerciseVisitedPopupService } from './exercise-visited-popup.service';
import { ExerciseVisitedService } from './exercise-visited.service';

@Component({
    selector: 'jhi-exercise-visited-delete-dialog',
    templateUrl: './exercise-visited-delete-dialog.component.html'
})
export class ExerciseVisitedDeleteDialogComponent {

    exerciseVisited: ExerciseVisited;

    constructor(
        private exerciseVisitedService: ExerciseVisitedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exerciseVisitedService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private exerciseVisitedPopupService: ExerciseVisitedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.exerciseVisitedPopupService
                .open(ExerciseVisitedDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
