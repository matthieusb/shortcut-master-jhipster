import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Keystroke } from './keystroke.model';
import { KeystrokeService } from './keystroke.service';

@Component({
    selector: 'jhi-keystroke-detail',
    templateUrl: './keystroke-detail.component.html'
})
export class KeystrokeDetailComponent implements OnInit, OnDestroy {

    keystroke: Keystroke;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keystrokeService: KeystrokeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeystrokes();
    }

    load(id) {
        this.keystrokeService.find(id)
            .subscribe((keystrokeResponse: HttpResponse<Keystroke>) => {
                this.keystroke = keystrokeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeystrokes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keystrokeListModification',
            (response) => this.load(this.keystroke.id)
        );
    }
}
