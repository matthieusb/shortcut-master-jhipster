/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseComponent } from 'app/entities/exercise/exercise.component';
import { ExerciseService } from 'app/entities/exercise/exercise.service';
import { Exercise } from 'app/shared/model/exercise.model';

describe('Component Tests', () => {
    describe('Exercise Management Component', () => {
        let comp: ExerciseComponent;
        let fixture: ComponentFixture<ExerciseComponent>;
        let service: ExerciseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseComponent],
                providers: [ExerciseService]
            })
                .overrideTemplate(ExerciseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExerciseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Exercise(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.exercises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
