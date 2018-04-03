import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShortcut } from 'app/shared/model/shortcut.model';
import { Principal } from 'app/core';
import { ShortcutService } from './shortcut.service';

@Component({
    selector: 'jhi-shortcut',
    templateUrl: './shortcut.component.html'
})
export class ShortcutComponent implements OnInit, OnDestroy {
    shortcuts: IShortcut[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private shortcutService: ShortcutService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.shortcutService.query().subscribe(
            (res: HttpResponse<IShortcut[]>) => {
                this.shortcuts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInShortcuts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IShortcut) {
        return item.id;
    }

    registerChangeInShortcuts() {
        this.eventSubscriber = this.eventManager.subscribe('shortcutListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
