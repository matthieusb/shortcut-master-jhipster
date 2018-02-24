/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedDetailComponent } from '../../../../../../main/webapp/app/entities/training-followed/training-followed-detail.component';
import { TrainingFollowedService } from '../../../../../../main/webapp/app/entities/training-followed/training-followed.service';
import { TrainingFollowed } from '../../../../../../main/webapp/app/entities/training-followed/training-followed.model';

describe('Component Tests', () => {

    describe('TrainingFollowed Management Detail Component', () => {
        let comp: TrainingFollowedDetailComponent;
        let fixture: ComponentFixture<TrainingFollowedDetailComponent>;
        let service: TrainingFollowedService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedDetailComponent],
                providers: [
                    TrainingFollowedService
                ]
            })
            .overrideTemplate(TrainingFollowedDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingFollowedDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingFollowedService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TrainingFollowed(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.trainingFollowed).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
