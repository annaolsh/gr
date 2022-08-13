import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-activity',
  templateUrl: './single-activity.component.html',
  styleUrls: ['./single-activity.component.scss'],
})
export class SingleActivityComponent implements OnInit {
  @Input() singleActivity: any = [];
  constructor() {}

  ngOnInit(): void {}
}
