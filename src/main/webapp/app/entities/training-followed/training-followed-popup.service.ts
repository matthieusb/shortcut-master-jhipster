import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TrainingFollowed } from './training-followed.model';
import { TrainingFollowedService } from './training-followed.service';

@Injectable()
export class TrainingFollowedPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private trainingFollowedService: TrainingFollowedService

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
                this.trainingFollowedService.find(id)
                    .subscribe((trainingFollowedResponse: HttpResponse<TrainingFollowed>) => {
                        const trainingFollowed: TrainingFollowed = trainingFollowedResponse.body;
                        trainingFollowed.lastVisitDate = this.datePipe
                            .transform(trainingFollowed.lastVisitDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.trainingFollowedModalRef(component, trainingFollowed);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.trainingFollowedModalRef(component, new TrainingFollowed());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    trainingFollowedModalRef(component: Component, trainingFollowed: TrainingFollowed): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.trainingFollowed = trainingFollowed;
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
