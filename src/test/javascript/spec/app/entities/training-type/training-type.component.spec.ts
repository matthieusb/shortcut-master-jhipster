/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingTypeComponent } from '../../../../../../main/webapp/app/entities/training-type/training-type.component';
import { TrainingTypeService } from '../../../../../../main/webapp/app/entities/training-type/training-type.service';
import { TrainingType } from '../../../../../../main/webapp/app/entities/training-type/training-type.model';

describe('Component Tests', () => {

    describe('TrainingType Management Component', () => {
        let comp: TrainingTypeComponent;
        let fixture: ComponentFixture<TrainingTypeComponent>;
        let service: TrainingTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingTypeComponent],
                providers: [
                    TrainingTypeService
                ]
            })
            .overrideTemplate(TrainingTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TrainingType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.trainingTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
