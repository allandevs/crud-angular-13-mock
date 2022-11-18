import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoursesComponent } from './courses.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let matDialog: MatDialog
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: MatDialog, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
