/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { CommandDetailComponent } from '../../../../../../main/webapp/app/entities/command/command-detail.component';
import { CommandService } from '../../../../../../main/webapp/app/entities/command/command.service';
import { Command } from '../../../../../../main/webapp/app/entities/command/command.model';

describe('Component Tests', () => {

    describe('Command Management Detail Component', () => {
        let comp: CommandDetailComponent;
        let fixture: ComponentFixture<CommandDetailComponent>;
        let service: CommandService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [CommandDetailComponent],
                providers: [
                    CommandService
                ]
            })
            .overrideTemplate(CommandDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Command(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.command).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
