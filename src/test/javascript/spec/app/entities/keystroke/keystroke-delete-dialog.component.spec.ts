/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShortcutmasterTestModule } from '../../../test.module';
import { KeystrokeDeleteDialogComponent } from 'app/entities/keystroke/keystroke-delete-dialog.component';
import { KeystrokeService } from 'app/entities/keystroke/keystroke.service';

describe('Component Tests', () => {
    describe('Keystroke Management Delete Component', () => {
        let comp: KeystrokeDeleteDialogComponent;
        let fixture: ComponentFixture<KeystrokeDeleteDialogComponent>;
        let service: KeystrokeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [KeystrokeDeleteDialogComponent],
                providers: [KeystrokeService]
            })
                .overrideTemplate(KeystrokeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KeystrokeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeystrokeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
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
