import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.less']
})
export class AddElementComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.taskForm = this.formBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      estimatedTime: ['',Validators.required],
      category: ['',Validators.required],
      date: ['',Validators.required],
      status: ['',Validators.required]
    })
  }
}
