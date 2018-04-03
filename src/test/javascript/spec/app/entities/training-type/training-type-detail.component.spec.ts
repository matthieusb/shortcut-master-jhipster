/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingTypeDetailComponent } from 'app/entities/training-type/training-type-detail.component';
import { TrainingType } from 'app/shared/model/training-type.model';

describe('Component Tests', () => {
    describe('TrainingType Management Detail Component', () => {
        let comp: TrainingTypeDetailComponent;
        let fixture: ComponentFixture<TrainingTypeDetailComponent>;
        const route = ({ data: of({ trainingType: new TrainingType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainingTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainingTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trainingType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
