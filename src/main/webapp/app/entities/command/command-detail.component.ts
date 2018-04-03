import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommand } from 'app/shared/model/command.model';

@Component({
    selector: 'jhi-command-detail',
    templateUrl: './command-detail.component.html'
})
export class CommandDetailComponent implements OnInit {
    command: ICommand;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ command }) => {
            this.command = command.body ? command.body : command;
        });
    }

    previousState() {
        window.history.back();
    }
}
