import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  public tasks:any = []
  private id: any
  constructor(private http: HttpClient) {
    this.id = localStorage.getItem(('user_id'));
  }

  getTasks(){
    this.tasks = this.http.get<any>('http://localhost:8080/api/user/'+this.id, optionRequete).subscribe((data => {
      this.tasks = data.tasks
      this.tasks.forEach((task:any)=>{
        task.etatEdition = false;
      })
    }))
  }

  stateUp(id:any){
    let task = this.tasks.find((task: { _id: any; }) => {
      return task._id === id
    })
    if (task != null){
      task.state = task.state+1;
      this.http.put<any>('http://localhost:8080/api/user/'+this.id+'/tache/'+task._id, {
        title:task.title,
        content:task.content,
        state:task.state
        }
        ,optionRequete)
        .subscribe((data => {
          return true
        }))
    }
  }

  stateDown(id:any){
    let task = this.tasks.find((task: { _id: any; }) => {
      return task._id === id
    })
    if (task != null){
      task.state = task.state - 1;
      this.http.put<any>('http://localhost:8080/api/user/'+this.id+'/tache/'+task._id, {
          title:task.title,
          content:task.content,
          state:task.state
        }
        ,optionRequete)
        .subscribe((data => {
        return true
      }))
    }
  }

  submit(id:any, state:any, title:any, content:any) {
    console.log(id)
    let task = this.tasks.find((task: { _id: any; }) => {
      return task._id === id
    })
    if (task != null){
      task.title = title,
      task.content = content,
      task.etatEdition = false;
      this.http.put<any>('http://localhost:8080/api/user/'+this.id+'/tache/'+task._id, {
          title:title,
          content:content,
          state:state
        }
        ,optionRequete)
        .subscribe((data => {
          return true
        }))
    }
  }

  modifTask(id: any){
    let task = this.tasks.find((task: { _id: any; }) => {
      return task._id === id
    })
    if (task != null){
      task.etatEdition = true;
    }
  }

  newCard(state: any, title:any, content:any){
    const last = this.tasks[this.tasks.length-1];
    let id
    if (last === undefined){

      this.http.post<any>('http://localhost:8080/api/user/'+this.id+'/tache', {
          state:state
        }
        ,optionRequete)
        .subscribe((data => {
          this.tasks.push(
            {
              "_id": data.id,
              "title" : "",
              "content" : "",
              "state" : state,
              "etatEdition":true,
            }
          );
        }))

    }
    else {

      this.http.post<any>('http://localhost:8080/api/user/'+this.id+'/tache', {
          state:state
        }
        ,optionRequete)
        .subscribe((data => {
          this.tasks.push(
            {
              "_id": data.id,
              "title" : "",
              "content" : "",
              "state" : state,
              "etatEdition":true,
            }
            );
        }))
    }
  }

  deleteTask(id: any){
    this.tasks = this.tasks.filter((task: { _id: any; }) => {
      return task._id != id
    })
    this.http.delete<any>('http://localhost:8080/api/user/'+this.id+'/tache/'+id,optionRequete)
      .subscribe((data => {
        return true
      }))
  }
}
