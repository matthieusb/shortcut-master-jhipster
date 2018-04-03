/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ExerciseVisitedDetailComponent } from 'app/entities/exercise-visited/exercise-visited-detail.component';
import { ExerciseVisited } from 'app/shared/model/exercise-visited.model';

describe('Component Tests', () => {
    describe('ExerciseVisited Management Detail Component', () => {
        let comp: ExerciseVisitedDetailComponent;
        let fixture: ComponentFixture<ExerciseVisitedDetailComponent>;
        const route = ({ data: of({ exerciseVisited: new ExerciseVisited(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ExerciseVisitedDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExerciseVisitedDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExerciseVisitedDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.exerciseVisited).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
