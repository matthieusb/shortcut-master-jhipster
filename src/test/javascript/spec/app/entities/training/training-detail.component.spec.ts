/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingDetailComponent } from 'app/entities/training/training-detail.component';
import { Training } from 'app/shared/model/training.model';

describe('Component Tests', () => {
    describe('Training Management Detail Component', () => {
        let comp: TrainingDetailComponent;
        let fixture: ComponentFixture<TrainingDetailComponent>;
        const route = ({ data: of({ training: new Training(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.training).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
