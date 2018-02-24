/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShortcutmasterTestModule } from '../../../test.module';
import { OpponentDetailComponent } from '../../../../../../main/webapp/app/entities/opponent/opponent-detail.component';
import { OpponentService } from '../../../../../../main/webapp/app/entities/opponent/opponent.service';
import { Opponent } from '../../../../../../main/webapp/app/entities/opponent/opponent.model';

describe('Component Tests', () => {

    describe('Opponent Management Detail Component', () => {
        let comp: OpponentDetailComponent;
        let fixture: ComponentFixture<OpponentDetailComponent>;
        let service: OpponentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [OpponentDetailComponent],
                providers: [
                    OpponentService
                ]
            })
            .overrideTemplate(OpponentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpponentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpponentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Opponent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.opponent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
