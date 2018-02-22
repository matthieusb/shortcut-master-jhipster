/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShortcutmasterTestModule } from '../../../test.module';
import { OpponentComponent } from '../../../../../../main/webapp/app/entities/opponent/opponent.component';
import { OpponentService } from '../../../../../../main/webapp/app/entities/opponent/opponent.service';
import { Opponent } from '../../../../../../main/webapp/app/entities/opponent/opponent.model';

describe('Component Tests', () => {

    describe('Opponent Management Component', () => {
        let comp: OpponentComponent;
        let fixture: ComponentFixture<OpponentComponent>;
        let service: OpponentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [OpponentComponent],
                providers: [
                    OpponentService
                ]
            })
            .overrideTemplate(OpponentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpponentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpponentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Opponent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.opponents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
