import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { capitalize } from 'lodash';
import { CapitalizePipe } from '../shared/capitalize.pipe';
import { HighlightDirective } from '../shared/highlight.directive';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

const testData = [
  {
    name: 'trulli',
    image: 'pic_trulli.jpg',
    alt: 'Italian Trulli',
  },
  {
    name: 'chania',
    image: 'img_chania.jpg',
    alt: 'Chania',
  },
];
class HomeServiceStub {
  getCities() {
    return Promise.resolve(testData);
  }
}

describe('Home Component', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let homeComponent: HomeComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, CapitalizePipe, HighlightDirective],
    }).overrideComponent(HomeComponent, {
      set: {
        providers: [
          {
            provide: HomeService,
            useClass: HomeServiceStub,
          },
        ],
      },
    });
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'is created and data received',
    waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(homeComponent).toBeDefined();
        expect(homeComponent.cities).toEqual(testData);
      });
    })
  );

 
