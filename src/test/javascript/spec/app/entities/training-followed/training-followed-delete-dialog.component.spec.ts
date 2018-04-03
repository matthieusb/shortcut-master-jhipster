/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedDeleteDialogComponent } from 'app/entities/training-followed/training-followed-delete-dialog.component';
import { TrainingFollowedService } from 'app/entities/training-followed/training-followed.service';

describe('Component Tests', () => {
    describe('TrainingFollowed Management Delete Component', () => {
        let comp: TrainingFollowedDeleteDialogComponent;
        let fixture: ComponentFixture<TrainingFollowedDeleteDialogComponent>;
        let service: TrainingFollowedService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedDeleteDialogComponent],
                providers: [TrainingFollowedService]
            })
                .overrideTemplate(TrainingFollowedDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainingFollowedDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingFollowedService);
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
