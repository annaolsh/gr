import { ApiService } from './../api-service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  activities: any = [];
  isFormOn = false;
  formType = '';
  editedActivityIdx: any = undefined;
  activityInfo = new FormGroup({
    title: new FormControl(''),
    time: new FormControl(''),
    type: new FormControl(''),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getActivities().subscribe((res) => (this.activities = res));
  }

  createNew(): void {
    this.isFormOn = true;
    this.formType = 'create';
  }

  formSubmitted(): void {
    if (this.formType === 'create') {
      this.activities.push(this.activityInfo.value);
      this.activityInfo.reset();
    } else if (this.formType === 'edit') {
      this.activities[this.editedActivityIdx].title =
        this.activityInfo.value.title;
      this.activities[this.editedActivityIdx].time =
        this.activityInfo.value.time;
      this.activities[this.editedActivityIdx].type =
        this.activityInfo.value.type;
    }
    this.closeForm();
  }

  closeForm() {
    this.isFormOn = false;
    this.activityInfo.reset();
    this.formType = '';
    this.editedActivityIdx = undefined;
  }

  deleteActivity(idx: any): void {
    this.activities.splice(idx, 1);
  }

  editActivity(idx: any): void {
    this.activityInfo.setValue({
      title: this.activities[idx].title,
      time: this.activities[idx].time,
      type: this.activities[idx].type,
    });
    this.isFormOn = true;
    this.formType = 'edit';
    this.editedActivityIdx = idx;
  }
}
