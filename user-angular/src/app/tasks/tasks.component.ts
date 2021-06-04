import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { TasksService} from "../tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(public taskService: TasksService) {

  }
  title = new FormControl('');
  content = new FormControl('');

  submit(id:any, state:any) {
   this.taskService.submit(id, state, this.title.value, this.content.value)
  }

  stateUp(id:any){
   this.taskService.stateUp(id)
  }

  stateDown(id:any){
    this.taskService.stateDown(id)
  }
  modifTask(id: any){
   this.taskService.modifTask(id)
  }

  newCard(state: any){
    this.taskService.newCard(state,this.title.value,this.content.value)
  }

  deleteTask(id: any){
    this.taskService.deleteTask(id)
  }

  ngOnInit() {
    this.taskService.getTasks()
  }
}
