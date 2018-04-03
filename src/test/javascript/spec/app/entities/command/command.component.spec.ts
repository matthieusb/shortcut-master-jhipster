/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { CommandComponent } from 'app/entities/command/command.component';
import { CommandService } from 'app/entities/command/command.service';
import { Command } from 'app/shared/model/command.model';

describe('Component Tests', () => {
    describe('Command Management Component', () => {
        let comp: CommandComponent;
        let fixture: ComponentFixture<CommandComponent>;
        let service: CommandService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [CommandComponent],
                providers: [CommandService]
            })
                .overrideTemplate(CommandComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommandComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Command(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.commands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
