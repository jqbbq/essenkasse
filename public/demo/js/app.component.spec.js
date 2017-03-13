/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
////////  SPECS  /////////////
describe('AppComponent', function () {
    let de;
    let comp;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h1'));
    });
    it('should create component', () => expect(comp).toBeDefined());
    it('should have expected <h1> text', () => {
        fixture.detectChanges();
        const h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/angular/i, '<h1> should say something about "Angular"');
    });
});
