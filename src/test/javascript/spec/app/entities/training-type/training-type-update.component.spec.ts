/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { TrainingTypeUpdateComponent } from 'app/entities/training-type/training-type-update.component';
import { TrainingTypeService } from 'app/entities/training-type/training-type.service';
import { TrainingType } from 'app/shared/model/training-type.model';

describe('Component Tests', () => {
    describe('TrainingType Management Update Component', () => {
        let comp: TrainingTypeUpdateComponent;
        let fixture: ComponentFixture<TrainingTypeUpdateComponent>;
        let service: TrainingTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [TrainingTypeUpdateComponent],
                providers: [TrainingTypeService]
            })
                .overrideTemplate(TrainingTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainingTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainingType(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.trainingType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainingType();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.trainingType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
