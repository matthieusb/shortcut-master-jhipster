import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Command } from './command.model';
import { CommandPopupService } from './command-popup.service';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command-delete-dialog',
    templateUrl: './command-delete-dialog.component.html'
})
export class CommandDeleteDialogComponent {

    command: Command;

    constructor(
        private commandService: CommandService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commandListModification',
                content: 'Deleted an command'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-command-delete-popup',
    template: ''
})
export class CommandDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandPopupService: CommandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commandPopupService
                .open(CommandDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
