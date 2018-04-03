/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { KeystrokeDetailComponent } from 'app/entities/keystroke/keystroke-detail.component';
import { Keystroke } from 'app/shared/model/keystroke.model';

describe('Component Tests', () => {
    describe('Keystroke Management Detail Component', () => {
        let comp: KeystrokeDetailComponent;
        let fixture: ComponentFixture<KeystrokeDetailComponent>;
        const route = ({ data: of({ keystroke: new Keystroke(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [KeystrokeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KeystrokeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KeystrokeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.keystroke).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
