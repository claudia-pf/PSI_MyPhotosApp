import { Component, Input, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { PhotoViewerService } from '../services/photo-viewer.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoViewerComponent implements OnInit {
  @Input()
  id!: string;
  private element: any;

  constructor(private photoViewerService: PhotoViewerService, private el: ElementRef) {
    this.element = el.nativeElement;
   }

  ngOnInit(): void {

    if(!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'app-photo-viewer') {
        this.close();
      }
    });

    this.photoViewerService.add(this);
  }

  ngOnDestroy(): void {
    this.photoViewerService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('photo-viewer-open');
  }

  close(): void {
    this.element.style.display = 'none'
    document.body.classList.remove('photo-viewer-open');
  }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      if (event.target == this.element) {
        this.element.style.display = 'none';
      }
    }

}
