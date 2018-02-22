import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Shortcut } from './shortcut.model';
import { ShortcutService } from './shortcut.service';

@Component({
    selector: 'jhi-shortcut-detail',
    templateUrl: './shortcut-detail.component.html'
})
export class ShortcutDetailComponent implements OnInit, OnDestroy {

    shortcut: Shortcut;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shortcutService: ShortcutService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShortcuts();
    }

    load(id) {
        this.shortcutService.find(id)
            .subscribe((shortcutResponse: HttpResponse<Shortcut>) => {
                this.shortcut = shortcutResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShortcuts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shortcutListModification',
            (response) => this.load(this.shortcut.id)
        );
    }
}
