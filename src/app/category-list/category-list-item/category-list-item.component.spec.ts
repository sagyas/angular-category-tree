import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CategoryListService } from '../category-list-service/category-list.service';
import { CategoryListItemComponent } from './category-list-item.component';

describe('CategoryListItemComponent', () => {
  let fixture;
  let component;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListItemComponent],
      providers: [CategoryListService],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CategoryListItemComponent);
    component = fixture.componentInstance;
  });

  it('should toggle the expanded boolean to true', () => {
    expect(component.expanded).toBeFalsy();
    component.onItemToggle();
    expect(component.expanded).toBeTruthy();
  });

  it("should render button '+' if expanded is false", () => {
    component.expanded = false;
    component.item = { node_name: '', children: [] };
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.innerText).toBe('+');
  });

  it("should render button '-' if expanded is true", () => {
    component.expanded = true;
    component.item = { node_name: '', children: [] };
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.innerText).toBe('-');
  });
});
