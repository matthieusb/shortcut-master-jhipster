/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { OpponentDetailComponent } from 'app/entities/opponent/opponent-detail.component';
import { Opponent } from 'app/shared/model/opponent.model';

describe('Component Tests', () => {
    describe('Opponent Management Detail Component', () => {
        let comp: OpponentDetailComponent;
        let fixture: ComponentFixture<OpponentDetailComponent>;
        const route = ({ data: of({ opponent: new Opponent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [OpponentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OpponentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OpponentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.opponent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
