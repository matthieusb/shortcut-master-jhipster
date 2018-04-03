/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedUpdateComponent } from 'app/entities/training-followed/training-followed-update.component';
import { TrainingFollowedService } from 'app/entities/training-followed/training-followed.service';
import { TrainingFollowed } from 'app/shared/model/training-followed.model';

import { TrainingService } from 'app/entities/training';

describe('Component Tests', () => {
    describe('TrainingFollowed Management Update Component', () => {
        let comp: TrainingFollowedUpdateComponent;
        let fixture: ComponentFixture<TrainingFollowedUpdateComponent>;
        let service: TrainingFollowedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedUpdateComponent],
                providers: [TrainingService, TrainingFollowedService]
            })
                .overrideTemplate(TrainingFollowedUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainingFollowedUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingFollowedService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainingFollowed(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.trainingFollowed = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainingFollowed();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.trainingFollowed = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
