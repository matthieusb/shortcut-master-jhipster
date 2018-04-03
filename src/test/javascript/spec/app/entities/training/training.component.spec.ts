/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingComponent } from 'app/entities/training/training.component';
import { TrainingService } from 'app/entities/training/training.service';
import { Training } from 'app/shared/model/training.model';

describe('Component Tests', () => {
    describe('Training Management Component', () => {
        let comp: TrainingComponent;
        let fixture: ComponentFixture<TrainingComponent>;
        let service: TrainingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingComponent],
                providers: [TrainingService]
            })
                .overrideTemplate(TrainingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Training(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trainings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
