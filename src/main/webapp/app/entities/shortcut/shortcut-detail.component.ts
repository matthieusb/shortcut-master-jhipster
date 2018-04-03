import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShortcut } from 'app/shared/model/shortcut.model';

@Component({
    selector: 'jhi-shortcut-detail',
    templateUrl: './shortcut-detail.component.html'
})
export class ShortcutDetailComponent implements OnInit {
    shortcut: IShortcut;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ shortcut }) => {
            this.shortcut = shortcut.body ? shortcut.body : shortcut;
        });
    }

    previousState() {
        window.history.back();
    }
}
