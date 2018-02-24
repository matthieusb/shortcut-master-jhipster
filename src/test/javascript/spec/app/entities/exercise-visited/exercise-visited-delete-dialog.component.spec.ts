/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseVisitedDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/exercise-visited/exercise-visited-delete-dialog.component';
import { ExerciseVisitedService } from '../../../../../../main/webapp/app/entities/exercise-visited/exercise-visited.service';

describe('Component Tests', () => {

    describe('ExerciseVisited Management Delete Component', () => {
        let comp: ExerciseVisitedDeleteDialogComponent;
        let fixture: ComponentFixture<ExerciseVisitedDeleteDialogComponent>;
        let service: ExerciseVisitedService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseVisitedDeleteDialogComponent],
                providers: [
                    ExerciseVisitedService
                ]
            })
            .overrideTemplate(ExerciseVisitedDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExerciseVisitedDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseVisitedService);
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
