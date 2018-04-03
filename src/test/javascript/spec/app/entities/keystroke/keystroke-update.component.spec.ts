/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { KeystrokeUpdateComponent } from 'app/entities/keystroke/keystroke-update.component';
import { KeystrokeService } from 'app/entities/keystroke/keystroke.service';
import { Keystroke } from 'app/shared/model/keystroke.model';

import { ShortcutService } from 'app/entities/shortcut';

describe('Component Tests', () => {
    describe('Keystroke Management Update Component', () => {
        let comp: KeystrokeUpdateComponent;
        let fixture: ComponentFixture<KeystrokeUpdateComponent>;
        let service: KeystrokeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [KeystrokeUpdateComponent],
                providers: [ShortcutService, KeystrokeService]
            })
                .overrideTemplate(KeystrokeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KeystrokeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeystrokeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Keystroke(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.keystroke = entity;
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
                    const entity = new Keystroke();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.keystroke = entity;
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
