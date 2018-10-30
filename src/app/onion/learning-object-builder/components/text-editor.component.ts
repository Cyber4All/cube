import { Input, Output, EventEmitter, Component, OnChanges, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'clark-text-editor',
  template: `
  <div *ngIf="showBox">
    <ckeditor
        [(ngModel)]="editorContent"
        [config]="config"
        [readonly]="false"
        (change)="onChange($event)"
        debounce="500"
        >
    </ckeditor>
  </div>
  `,
  styles: ['#cke_bottom_detail, .cke_bottom { display: none; }']
})
export class TextEditorComponent implements OnInit, OnChanges {
  @Output() textOutput: EventEmitter<String> = new EventEmitter<String>();
  @Input() savedContent: String;
  @Input() editorPlaceholder: String;
  editorContent: String;
  counter: any;
  buttonText: String;

  showBox: Boolean = true;
  config: any;

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.editorContent = this.savedContent;
  }
  ngOnInit() {
    this.counter = {
      showParagraphs: false,
      showWordCount: false,
      showCharCount: true,
      countSpacesAsChars: false,
      countHTML: false,
      maxWordCount: -1,
      maxCharCount: 1000,
    };

    this.config = {
      uiColor: '',
      extraPlugins: 'confighelper,wordcount,notification',
      placeholder: this.editorPlaceholder,
      removePlugins: 'elementspath,wsc,scayt',
      autoGrow_onStartup: true,
      entities: false,
      wordcount: this.counter
    };
    if (this.savedContent) {
      // this.editorContent = this.savedContent;
      this.buttonText = 'Show Content';
      // this.toggleBox();
    } else {
      this.buttonText = 'Add Content';

    }
  }

  onChange(editorContent) {
    this.textOutput.emit(this.editorContent);
  }

  toggleBox() {
    this.showBox = !this.showBox;
    if (this.showBox === false && !this.savedContent) {
      this.buttonText = 'Add Content';
    } else if (this.showBox === false && this.savedContent) {
      this.buttonText = 'Show Content';
    } else {
      this.buttonText = 'Hide Content';
    }
  }
}
