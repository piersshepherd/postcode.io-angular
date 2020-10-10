import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-postcode-find-nearest',
  templateUrl: './find-nearest.component.html',
  styleUrls: ['./find-nearest.component.scss']
})
export class FindNearestComponent implements OnInit {
  @Input() postcode: string;
  @Output() find = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emit the postcode when the button is clicked.
   */
  onButtonClick() {
    this.find.emit(this.postcode);
  }

}
