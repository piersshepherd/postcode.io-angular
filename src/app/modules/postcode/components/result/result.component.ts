import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { PostcodeLocation } from '../../interfaces/postcode.interface';

@Component({
  selector: 'app-postcode-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() location: PostcodeLocation;

  constructor() { }

  ngOnInit(): void {
  }

}
