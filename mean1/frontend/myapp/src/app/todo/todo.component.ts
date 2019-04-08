import { Component, OnInit } from '@angular/core';

import {FormControl,FormGroup, Validators} from '@angular/forms';
import { TodoService } from '../todo.service';
import {Todo} from './todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  //to store complited todo
  complitedTodo:Todo[];

  //to store toods
  todos:Todo[];

  constructor(private todoserv:TodoService) { }
  
  //setting for time
  AmPm=new Date().getHours()>=12?'pm':'am';
  currentTime=new Date().getHours()+':'+new Date().getMinutes()+':'+this.AmPm;
  currentDate=new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
  
  ngOnInit() {

    //getting todos 
    this.todoserv.getTodo().subscribe((res)=>{
        this.todos=res;
    });
    this.todoserv.getComplitedTasks().subscribe((res)=>{this.complitedTodo=res});
  }
  
  //form setting for todo
  todoForm=new FormGroup({
    item:new FormControl('',Validators.required)
  });

  //adding task to database
  addTodo()
  {
    
    if(this.todoForm.invalid)
    {
      alert('Form can\'t be empty');
      return ;}
    else
    {
      const value={
        item:this.todoForm.value.item,
        dt:this.currentDate,
        time:this.currentTime
      }
      this.todoserv.addTodo(value).subscribe(res=>{console.log(res),this.ngOnInit();});
    }
    
  }

  //delete task from todolist
  delTodo(todo:any)
  {
    //console.log(todo);
    this.todoserv.removeTodo(todo).subscribe((res)=>{console.log(res),this.ngOnInit();});
  }

  //delete the complited task
  delCompTodo(todoid)
  {
    this.todoserv.delComplitedTask(todoid).subscribe((res)=>{console.log(res),this.ngOnInit()});
  }

}
