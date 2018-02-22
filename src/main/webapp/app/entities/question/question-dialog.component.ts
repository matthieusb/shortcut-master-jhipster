import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Question } from './question.model';
import { QuestionPopupService } from './question-popup.service';
import { QuestionService } from './question.service';
import { Command, CommandService } from '../command';
import { Shortcut, ShortcutService } from '../shortcut';
import { Exercise, ExerciseService } from '../exercise';

@Component({
    selector: 'jhi-question-dialog',
    templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit {

    question: Question;
    isSaving: boolean;

    commandquestions: Command[];

    shorcutquestions: Shortcut[];

    exercises: Exercise[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private questionService: QuestionService,
        private commandService: CommandService,
        private shortcutService: ShortcutService,
        private exerciseService: ExerciseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.commandService
            .query({filter: 'question-is-null'})
            .subscribe((res: HttpResponse<Command[]>) => {
                if (!this.question.commandQuestion || !this.question.commandQuestion.id) {
                    this.commandquestions = res.body;
                } else {
                    this.commandService
                        .find(this.question.commandQuestion.id)
                        .subscribe((subRes: HttpResponse<Command>) => {
                            this.commandquestions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.shortcutService
            .query({filter: 'question-is-null'})
            .subscribe((res: HttpResponse<Shortcut[]>) => {
                if (!this.question.shorcutQuestion || !this.question.shorcutQuestion.id) {
                    this.shorcutquestions = res.body;
                } else {
                    this.shortcutService
                        .find(this.question.shorcutQuestion.id)
                        .subscribe((subRes: HttpResponse<Shortcut>) => {
                            this.shorcutquestions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.exerciseService.query()
            .subscribe((res: HttpResponse<Exercise[]>) => { this.exercises = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.question.id !== undefined) {
            this.subscribeToSaveResponse(
                this.questionService.update(this.question));
        } else {
            this.subscribeToSaveResponse(
                this.questionService.create(this.question));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Question>>) {
        result.subscribe((res: HttpResponse<Question>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Question) {
        this.eventManager.broadcast({ name: 'questionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCommandById(index: number, item: Command) {
        return item.id;
    }

    trackShortcutById(index: number, item: Shortcut) {
        return item.id;
    }

    trackExerciseById(index: number, item: Exercise) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-question-popup',
    template: ''
})
export class QuestionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionPopupService: QuestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.questionPopupService
                    .open(QuestionDialogComponent as Component, params['id']);
            } else {
                this.questionPopupService
                    .open(QuestionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
