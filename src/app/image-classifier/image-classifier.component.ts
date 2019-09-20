import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-image-classifier',
  templateUrl: './image-classifier.component.html',
  styleUrls: ['./image-classifier.component.scss']
})
export class ImageClassifierComponent implements OnInit {

  @ViewChild('imgContent', { static: false }) imgContent: ElementRef;

  model: any;
  loading: boolean;
  imgSrc: WindowBase64;
  predictions: any;

  constructor() { }

  async ngOnInit() {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
  }

  async fileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;
      };

      setTimeout(async () => {
        this.predictions = await this.model.classify(this.imgContent.nativeElement);
      });
    }
  }

}
