/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ShortcutComponent } from '../../../../../../main/webapp/app/entities/shortcut/shortcut.component';
import { ShortcutService } from '../../../../../../main/webapp/app/entities/shortcut/shortcut.service';
import { Shortcut } from '../../../../../../main/webapp/app/entities/shortcut/shortcut.model';

describe('Component Tests', () => {

    describe('Shortcut Management Component', () => {
        let comp: ShortcutComponent;
        let fixture: ComponentFixture<ShortcutComponent>;
        let service: ShortcutService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ShortcutComponent],
                providers: [
                    ShortcutService
                ]
            })
            .overrideTemplate(ShortcutComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShortcutComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShortcutService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Shortcut(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.shortcuts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
