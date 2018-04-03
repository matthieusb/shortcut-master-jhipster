import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IKeystroke } from 'app/shared/model/keystroke.model';
import { KeystrokeService } from './keystroke.service';
import { IShortcut } from 'app/shared/model/shortcut.model';
import { ShortcutService } from 'app/entities/shortcut';

@Component({
    selector: 'jhi-keystroke-update',
    templateUrl: './keystroke-update.component.html'
})
export class KeystrokeUpdateComponent implements OnInit {
    private _keystroke: IKeystroke;
    isSaving: boolean;

    shortcuts: IShortcut[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private keystrokeService: KeystrokeService,
        private shortcutService: ShortcutService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ keystroke }) => {
            this.keystroke = keystroke.body ? keystroke.body : keystroke;
        });
        this.shortcutService.query().subscribe(
            (res: HttpResponse<IShortcut[]>) => {
                this.shortcuts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.keystroke.id !== undefined) {
            this.subscribeToSaveResponse(this.keystrokeService.update(this.keystroke));
        } else {
            this.subscribeToSaveResponse(this.keystrokeService.create(this.keystroke));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IKeystroke>>) {
        result.subscribe((res: HttpResponse<IKeystroke>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IKeystroke) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackShortcutById(index: number, item: IShortcut) {
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
    get keystroke() {
        return this._keystroke;
    }

    set keystroke(keystroke: IKeystroke) {
        this._keystroke = keystroke;
    }
}
