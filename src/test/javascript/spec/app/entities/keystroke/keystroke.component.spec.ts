/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { KeystrokeComponent } from '../../../../../../main/webapp/app/entities/keystroke/keystroke.component';
import { KeystrokeService } from '../../../../../../main/webapp/app/entities/keystroke/keystroke.service';
import { Keystroke } from '../../../../../../main/webapp/app/entities/keystroke/keystroke.model';

describe('Component Tests', () => {

    describe('Keystroke Management Component', () => {
        let comp: KeystrokeComponent;
        let fixture: ComponentFixture<KeystrokeComponent>;
        let service: KeystrokeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [KeystrokeComponent],
                providers: [
                    KeystrokeService
                ]
            })
            .overrideTemplate(KeystrokeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeystrokeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeystrokeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Keystroke(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keystrokes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
