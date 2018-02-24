/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingTypeDetailComponent } from '../../../../../../main/webapp/app/entities/training-type/training-type-detail.component';
import { TrainingTypeService } from '../../../../../../main/webapp/app/entities/training-type/training-type.service';
import { TrainingType } from '../../../../../../main/webapp/app/entities/training-type/training-type.model';

describe('Component Tests', () => {

    describe('TrainingType Management Detail Component', () => {
        let comp: TrainingTypeDetailComponent;
        let fixture: ComponentFixture<TrainingTypeDetailComponent>;
        let service: TrainingTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingTypeDetailComponent],
                providers: [
                    TrainingTypeService
                ]
            })
            .overrideTemplate(TrainingTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TrainingType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.trainingType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
