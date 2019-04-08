import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url='http://localhost:3000';
  constructor(private _http:HttpClient) { }
  addTodo(body:any)
  {
    return this._http.post(this.url+'/addTodo',body);
  }
  getTodo():Observable<Todo[]>
  {
    return this._http.get<Todo[]>(this.url+'/getTodo');
  }
  removeTodo(body:any)
  {
    return this._http.get(this.url+'/del/'+body);
  }
  getComplitedTasks():Observable<Todo[]>
  {
    return this._http.get<Todo[]>(this.url+'/complitTask');
  }
  delComplitedTask(id:any)
  {
    return this._http.get(this.url+'/delComplitTask/'+id);
  }
}
