import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewerV2Component } from './photo-viewer-v2.component';

describe('PhotoViewerV2Component', () => {
  let component: PhotoViewerV2Component;
  let fixture: ComponentFixture<PhotoViewerV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoViewerV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
