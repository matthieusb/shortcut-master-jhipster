import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKeystroke } from 'app/shared/model/keystroke.model';
import { Principal } from 'app/core';
import { KeystrokeService } from './keystroke.service';

@Component({
    selector: 'jhi-keystroke',
    templateUrl: './keystroke.component.html'
})
export class KeystrokeComponent implements OnInit, OnDestroy {
    keystrokes: IKeystroke[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keystrokeService: KeystrokeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.keystrokeService.query().subscribe(
            (res: HttpResponse<IKeystroke[]>) => {
                this.keystrokes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKeystrokes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKeystroke) {
        return item.id;
    }

    registerChangeInKeystrokes() {
        this.eventSubscriber = this.eventManager.subscribe('keystrokeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
