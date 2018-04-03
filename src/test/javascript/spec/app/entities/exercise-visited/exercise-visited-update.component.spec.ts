/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseVisitedUpdateComponent } from 'app/entities/exercise-visited/exercise-visited-update.component';
import { ExerciseVisitedService } from 'app/entities/exercise-visited/exercise-visited.service';
import { ExerciseVisited } from 'app/shared/model/exercise-visited.model';

import { ExerciseService } from 'app/entities/exercise';

describe('Component Tests', () => {
    describe('ExerciseVisited Management Update Component', () => {
        let comp: ExerciseVisitedUpdateComponent;
        let fixture: ComponentFixture<ExerciseVisitedUpdateComponent>;
        let service: ExerciseVisitedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseVisitedUpdateComponent],
                providers: [ExerciseService, ExerciseVisitedService]
            })
                .overrideTemplate(ExerciseVisitedUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExerciseVisitedUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseVisitedService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ExerciseVisited(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.exerciseVisited = entity;
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
                    const entity = new ExerciseVisited();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.exerciseVisited = entity;
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
