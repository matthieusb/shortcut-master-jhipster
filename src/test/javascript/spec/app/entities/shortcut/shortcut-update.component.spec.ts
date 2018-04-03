/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ShortcutUpdateComponent } from 'app/entities/shortcut/shortcut-update.component';
import { ShortcutService } from 'app/entities/shortcut/shortcut.service';
import { Shortcut } from 'app/shared/model/shortcut.model';

import { KeystrokeService } from 'app/entities/keystroke';

describe('Component Tests', () => {
    describe('Shortcut Management Update Component', () => {
        let comp: ShortcutUpdateComponent;
        let fixture: ComponentFixture<ShortcutUpdateComponent>;
        let service: ShortcutService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ShortcutUpdateComponent],
                providers: [KeystrokeService, ShortcutService]
            })
                .overrideTemplate(ShortcutUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShortcutUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShortcutService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Shortcut(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.shortcut = entity;
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
                    const entity = new Shortcut();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.shortcut = entity;
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
