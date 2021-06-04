import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  })
};

@Injectable({
  providedIn: 'root'
})


export class UsersService {
  private usersUrl:string
  constructor(private http: HttpClient, public router: Router) {
    this.usersUrl='http://localhost:8080/api/user'
  }
  signIn(email:any ,mdp: any){
    this.http.post<any>('http://localhost:8080/api/user/connect', {mail:email, pass:mdp}, optionRequete).subscribe((data)=>{
      if (data.response === 'ok'){
        localStorage.setItem('ACCESS_TOKEN', "access_token");
        localStorage.setItem('user_id', data.user_id);
        this.router.navigate(['tasks']).then(()=>{
          window.location.reload();
        }
        );
      }
    })
  }

  signUp(email:any, mdp:any, name:any){
    this.http.post<any>('http://localhost:8080/api/user', {mail:email, pass:mdp, name:name}, optionRequete).subscribe((data)=>{
      if (data.message === 'Utilisateur crée !'){
        this.router.navigate(['sign-in']);
      }
    })
  }

  get(){
    this.http.get<any>('http://localhost:8080/api/user', optionRequete).subscribe((data)=>{
    })
  }

  getOne(id:any){
    this.http.get<any>('http://localhost:8080/api/user/' + id, optionRequete).subscribe((data)=>{
    })
  }

}
