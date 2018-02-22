import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Keystroke } from './keystroke.model';
import { KeystrokeService } from './keystroke.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-keystroke',
    templateUrl: './keystroke.component.html'
})
export class KeystrokeComponent implements OnInit, OnDestroy {
keystrokes: Keystroke[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keystrokeService: KeystrokeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.keystrokeService.query().subscribe(
            (res: HttpResponse<Keystroke[]>) => {
                this.keystrokes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKeystrokes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Keystroke) {
        return item.id;
    }
    registerChangeInKeystrokes() {
        this.eventSubscriber = this.eventManager.subscribe('keystrokeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
