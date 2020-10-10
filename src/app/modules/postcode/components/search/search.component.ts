import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-postcode-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() submission = new EventEmitter<string>();

  formInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emit the inputted value.
   *
   * @note We could also do some basic postcode validation here.
   */
  submitForm(): void {
    this.submission.emit(this.formInput);
  }

}
