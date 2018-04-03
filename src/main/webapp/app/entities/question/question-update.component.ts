import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from 'app/entities/command';
import { IShortcut } from 'app/shared/model/shortcut.model';
import { ShortcutService } from 'app/entities/shortcut';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise';

@Component({
    selector: 'jhi-question-update',
    templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
    private _question: IQuestion;
    isSaving: boolean;

    commandquestions: ICommand[];

    shorcutquestions: IShortcut[];

    exercises: IExercise[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private questionService: QuestionService,
        private commandService: CommandService,
        private shortcutService: ShortcutService,
        private exerciseService: ExerciseService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ question }) => {
            this.question = question.body ? question.body : question;
        });
        this.commandService.query({ filter: 'question-is-null' }).subscribe(
            (res: HttpResponse<ICommand[]>) => {
                if (!this.question.commandQuestion || !this.question.commandQuestion.id) {
                    this.commandquestions = res.body;
                } else {
                    this.commandService.find(this.question.commandQuestion.id).subscribe(
                        (subRes: HttpResponse<ICommand>) => {
                            this.commandquestions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.shortcutService.query({ filter: 'question-is-null' }).subscribe(
            (res: HttpResponse<IShortcut[]>) => {
                if (!this.question.shorcutQuestion || !this.question.shorcutQuestion.id) {
                    this.shorcutquestions = res.body;
                } else {
                    this.shortcutService.find(this.question.shorcutQuestion.id).subscribe(
                        (subRes: HttpResponse<IShortcut>) => {
                            this.shorcutquestions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.exerciseService.query().subscribe(
            (res: HttpResponse<IExercise[]>) => {
                this.exercises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.question.id !== undefined) {
            this.subscribeToSaveResponse(this.questionService.update(this.question));
        } else {
            this.subscribeToSaveResponse(this.questionService.create(this.question));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
        result.subscribe((res: HttpResponse<IQuestion>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IQuestion) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCommandById(index: number, item: ICommand) {
        return item.id;
    }

    trackShortcutById(index: number, item: IShortcut) {
        return item.id;
    }

    trackExerciseById(index: number, item: IExercise) {
        return item.id;
    }
    get question() {
        return this._question;
    }

    set question(question: IQuestion) {
        this._question = question;
    }
}
