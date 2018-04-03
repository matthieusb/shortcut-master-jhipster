import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeystroke } from 'app/shared/model/keystroke.model';

@Component({
    selector: 'jhi-keystroke-detail',
    templateUrl: './keystroke-detail.component.html'
})
export class KeystrokeDetailComponent implements OnInit {
    keystroke: IKeystroke;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ keystroke }) => {
            this.keystroke = keystroke.body ? keystroke.body : keystroke;
        });
    }

    previousState() {
        window.history.back();
    }
}
