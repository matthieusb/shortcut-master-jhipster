/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { CommandUpdateComponent } from 'app/entities/command/command-update.component';
import { CommandService } from 'app/entities/command/command.service';
import { Command } from 'app/shared/model/command.model';

describe('Component Tests', () => {
    describe('Command Management Update Component', () => {
        let comp: CommandUpdateComponent;
        let fixture: ComponentFixture<CommandUpdateComponent>;
        let service: CommandService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [CommandUpdateComponent],
                providers: [CommandService]
            })
                .overrideTemplate(CommandUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommandUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Command(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.command = entity;
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
                    const entity = new Command();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.command = entity;
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
