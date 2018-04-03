/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseUpdateComponent } from 'app/entities/exercise/exercise-update.component';
import { ExerciseService } from 'app/entities/exercise/exercise.service';
import { Exercise } from 'app/shared/model/exercise.model';

import { OpponentService } from 'app/entities/opponent';
import { TrainingService } from 'app/entities/training';

describe('Component Tests', () => {
    describe('Exercise Management Update Component', () => {
        let comp: ExerciseUpdateComponent;
        let fixture: ComponentFixture<ExerciseUpdateComponent>;
        let service: ExerciseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseUpdateComponent],
                providers: [OpponentService, TrainingService, ExerciseService]
            })
                .overrideTemplate(ExerciseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExerciseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Exercise(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.exercise = entity;
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
                    const entity = new Exercise();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.exercise = entity;
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
