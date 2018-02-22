/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ShortcutDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/shortcut/shortcut-delete-dialog.component';
import { ShortcutService } from '../../../../../../main/webapp/app/entities/shortcut/shortcut.service';

describe('Component Tests', () => {

    describe('Shortcut Management Delete Component', () => {
        let comp: ShortcutDeleteDialogComponent;
        let fixture: ComponentFixture<ShortcutDeleteDialogComponent>;
        let service: ShortcutService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ShortcutDeleteDialogComponent],
                providers: [
                    ShortcutService
                ]
            })
            .overrideTemplate(ShortcutDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShortcutDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShortcutService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
