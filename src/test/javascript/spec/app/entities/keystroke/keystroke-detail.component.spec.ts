/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { KeystrokeDetailComponent } from '../../../../../../main/webapp/app/entities/keystroke/keystroke-detail.component';
import { KeystrokeService } from '../../../../../../main/webapp/app/entities/keystroke/keystroke.service';
import { Keystroke } from '../../../../../../main/webapp/app/entities/keystroke/keystroke.model';

describe('Component Tests', () => {

    describe('Keystroke Management Detail Component', () => {
        let comp: KeystrokeDetailComponent;
        let fixture: ComponentFixture<KeystrokeDetailComponent>;
        let service: KeystrokeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [KeystrokeDetailComponent],
                providers: [
                    KeystrokeService
                ]
            })
            .overrideTemplate(KeystrokeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeystrokeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeystrokeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Keystroke(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.keystroke).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
