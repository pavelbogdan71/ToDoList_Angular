import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { StatusType } from 'src/app/helpers/status-type';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.less']
})
export class AddElementComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({});
  statusType = StatusType.UNFINISHED;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.taskForm = this.formBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      estimatedTime: ["",{
        validators: [Validators.compose([
          Validators.required,
          CustomValidators.estimatedTime
        ])],
        updateOn: 'blur'
      }],
      category: ['',Validators.required],
      date: ["",{
        validators: [Validators.compose([
          Validators.required,
          CustomValidators.date
        ])],
        updateOn: 'blur'
      }],
      status: [this.statusType]
    });
  }

  get estimatedTime(){
    return this.taskForm.get('estimatedTime');
  }

  get date(){
    return this.taskForm.get('date');
  }

  get title(){
    return this.taskForm.get('title');
  }

  get description(){
    return this.taskForm.get('description');
  }

  get category(){
    return this.taskForm.get('category');
  }

  get status(){
    return this.taskForm.get('status');
  }
}
