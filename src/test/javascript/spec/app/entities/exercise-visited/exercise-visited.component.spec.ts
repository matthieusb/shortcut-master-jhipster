/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseVisitedComponent } from 'app/entities/exercise-visited/exercise-visited.component';
import { ExerciseVisitedService } from 'app/entities/exercise-visited/exercise-visited.service';
import { ExerciseVisited } from 'app/shared/model/exercise-visited.model';

describe('Component Tests', () => {
    describe('ExerciseVisited Management Component', () => {
        let comp: ExerciseVisitedComponent;
        let fixture: ComponentFixture<ExerciseVisitedComponent>;
        let service: ExerciseVisitedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseVisitedComponent],
                providers: [ExerciseVisitedService]
            })
                .overrideTemplate(ExerciseVisitedComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExerciseVisitedComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseVisitedService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new ExerciseVisited(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.exerciseVisiteds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
