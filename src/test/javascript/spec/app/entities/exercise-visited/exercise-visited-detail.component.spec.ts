/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseVisitedDetailComponent } from '../../../../../../main/webapp/app/entities/exercise-visited/exercise-visited-detail.component';
import { ExerciseVisitedService } from '../../../../../../main/webapp/app/entities/exercise-visited/exercise-visited.service';
import { ExerciseVisited } from '../../../../../../main/webapp/app/entities/exercise-visited/exercise-visited.model';

describe('Component Tests', () => {

    describe('ExerciseVisited Management Detail Component', () => {
        let comp: ExerciseVisitedDetailComponent;
        let fixture: ComponentFixture<ExerciseVisitedDetailComponent>;
        let service: ExerciseVisitedService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseVisitedDetailComponent],
                providers: [
                    ExerciseVisitedService
                ]
            })
            .overrideTemplate(ExerciseVisitedDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExerciseVisitedDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExerciseVisitedService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ExerciseVisited(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.exerciseVisited).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
