import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestion } from 'app/shared/model/question.model';

@Component({
    selector: 'jhi-question-detail',
    templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    question: IQuestion;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ question }) => {
            this.question = question.body ? question.body : question;
        });
    }

    previousState() {
        window.history.back();
    }
}
