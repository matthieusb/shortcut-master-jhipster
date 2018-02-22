import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ExerciseVisited } from './exercise-visited.model';
import { ExerciseVisitedService } from './exercise-visited.service';

@Injectable()
export class ExerciseVisitedPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private exerciseVisitedService: ExerciseVisitedService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.exerciseVisitedService.find(id)
                    .subscribe((exerciseVisitedResponse: HttpResponse<ExerciseVisited>) => {
                        const exerciseVisited: ExerciseVisited = exerciseVisitedResponse.body;
                        this.ngbModalRef = this.exerciseVisitedModalRef(component, exerciseVisited);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.exerciseVisitedModalRef(component, new ExerciseVisited());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    exerciseVisitedModalRef(component: Component, exerciseVisited: ExerciseVisited): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.exerciseVisited = exerciseVisited;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
