/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingFollowedComponent } from 'app/entities/training-followed/training-followed.component';
import { TrainingFollowedService } from 'app/entities/training-followed/training-followed.service';
import { TrainingFollowed } from 'app/shared/model/training-followed.model';

describe('Component Tests', () => {
    describe('TrainingFollowed Management Component', () => {
        let comp: TrainingFollowedComponent;
        let fixture: ComponentFixture<TrainingFollowedComponent>;
        let service: TrainingFollowedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingFollowedComponent],
                providers: [TrainingFollowedService]
            })
                .overrideTemplate(TrainingFollowedComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainingFollowedComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingFollowedService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new TrainingFollowed(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trainingFolloweds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
