import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsearchComponent } from './albumsearch.component';

describe('AlbumsearchComponent', () => {
  let component: AlbumsearchComponent;
  let fixture: ComponentFixture<AlbumsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
