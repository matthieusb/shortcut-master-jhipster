/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { OpponentUpdateComponent } from 'app/entities/opponent/opponent-update.component';
import { OpponentService } from 'app/entities/opponent/opponent.service';
import { Opponent } from 'app/shared/model/opponent.model';

describe('Component Tests', () => {
    describe('Opponent Management Update Component', () => {
        let comp: OpponentUpdateComponent;
        let fixture: ComponentFixture<OpponentUpdateComponent>;
        let service: OpponentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [OpponentUpdateComponent],
                providers: [OpponentService]
            })
                .overrideTemplate(OpponentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OpponentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpponentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Opponent(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.opponent = entity;
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
                    const entity = new Opponent();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.opponent = entity;
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
