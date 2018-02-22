/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedDialogComponent } from '../../../../../../main/webapp/app/entities/training-followed/training-followed-dialog.component';
import { TrainingFollowedService } from '../../../../../../main/webapp/app/entities/training-followed/training-followed.service';
import { TrainingFollowed } from '../../../../../../main/webapp/app/entities/training-followed/training-followed.model';
import { TrainingService } from '../../../../../../main/webapp/app/entities/training';

describe('Component Tests', () => {

    describe('TrainingFollowed Management Dialog Component', () => {
        let comp: TrainingFollowedDialogComponent;
        let fixture: ComponentFixture<TrainingFollowedDialogComponent>;
        let service: TrainingFollowedService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedDialogComponent],
                providers: [
                    TrainingService,
                    TrainingFollowedService
                ]
            })
            .overrideTemplate(TrainingFollowedDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingFollowedDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingFollowedService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TrainingFollowed(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.trainingFollowed = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'trainingFollowedListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TrainingFollowed();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.trainingFollowed = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'trainingFollowedListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
