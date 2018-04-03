/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ShortcutmasterTestModule } from '../../../test.module';
import { ShortcutDetailComponent } from 'app/entities/shortcut/shortcut-detail.component';
import { Shortcut } from 'app/shared/model/shortcut.model';

describe('Component Tests', () => {
    describe('Shortcut Management Detail Component', () => {
        let comp: ShortcutDetailComponent;
        let fixture: ComponentFixture<ShortcutDetailComponent>;
        const route = ({ data: of({ shortcut: new Shortcut(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShortcutmasterTestModule],
                declarations: [ShortcutDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShortcutDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShortcutDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shortcut).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
