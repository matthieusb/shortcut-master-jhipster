/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedDetailComponent } from 'app/entities/training-followed/training-followed-detail.component';
import { TrainingFollowed } from 'app/shared/model/training-followed.model';

describe('Component Tests', () => {
    describe('TrainingFollowed Management Detail Component', () => {
        let comp: TrainingFollowedDetailComponent;
        let fixture: ComponentFixture<TrainingFollowedDetailComponent>;
        const route = ({ data: of({ trainingFollowed: new TrainingFollowed(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainingFollowedDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainingFollowedDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trainingFollowed).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
