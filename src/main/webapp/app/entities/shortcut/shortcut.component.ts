import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Shortcut } from './shortcut.model';
import { ShortcutService } from './shortcut.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-shortcut',
    templateUrl: './shortcut.component.html'
})
export class ShortcutComponent implements OnInit, OnDestroy {
shortcuts: Shortcut[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private shortcutService: ShortcutService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.shortcutService.query().subscribe(
            (res: HttpResponse<Shortcut[]>) => {
                this.shortcuts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInShortcuts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Shortcut) {
        return item.id;
    }
    registerChangeInShortcuts() {
        this.eventSubscriber = this.eventManager.subscribe('shortcutListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
