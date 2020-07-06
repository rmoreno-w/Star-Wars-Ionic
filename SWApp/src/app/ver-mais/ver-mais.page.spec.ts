import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerMaisPage } from './ver-mais.page';

describe('VerMaisPage', () => {
  let component: VerMaisPage;
  let fixture: ComponentFixture<VerMaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerMaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
