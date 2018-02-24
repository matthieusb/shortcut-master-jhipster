/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingDetailComponent } from '../../../../../../main/webapp/app/entities/training/training-detail.component';
import { TrainingService } from '../../../../../../main/webapp/app/entities/training/training.service';
import { Training } from '../../../../../../main/webapp/app/entities/training/training.model';

describe('Component Tests', () => {

    describe('Training Management Detail Component', () => {
        let comp: TrainingDetailComponent;
        let fixture: ComponentFixture<TrainingDetailComponent>;
        let service: TrainingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingDetailComponent],
                providers: [
                    TrainingService
                ]
            })
            .overrideTemplate(TrainingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Training(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.training).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
