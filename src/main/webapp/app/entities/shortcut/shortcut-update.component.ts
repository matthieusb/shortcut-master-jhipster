import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IShortcut } from 'app/shared/model/shortcut.model';
import { ShortcutService } from './shortcut.service';
import { IKeystroke } from 'app/shared/model/keystroke.model';
import { KeystrokeService } from 'app/entities/keystroke';

@Component({
    selector: 'jhi-shortcut-update',
    templateUrl: './shortcut-update.component.html'
})
export class ShortcutUpdateComponent implements OnInit {
    private _shortcut: IShortcut;
    isSaving: boolean;

    keystrokes: IKeystroke[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private shortcutService: ShortcutService,
        private keystrokeService: KeystrokeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ shortcut }) => {
            this.shortcut = shortcut.body ? shortcut.body : shortcut;
        });
        this.keystrokeService.query().subscribe(
            (res: HttpResponse<IKeystroke[]>) => {
                this.keystrokes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.shortcut.id !== undefined) {
            this.subscribeToSaveResponse(this.shortcutService.update(this.shortcut));
        } else {
            this.subscribeToSaveResponse(this.shortcutService.create(this.shortcut));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IShortcut>>) {
        result.subscribe((res: HttpResponse<IShortcut>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IShortcut) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackKeystrokeById(index: number, item: IKeystroke) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get shortcut() {
        return this._shortcut;
    }

    set shortcut(shortcut: IShortcut) {
        this._shortcut = shortcut;
    }
}
