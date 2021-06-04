import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService} from "../users.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private userService: UsersService) { }
  email = new FormControl('');
  mdp = new FormControl('');


  ngOnInit(): void {
  }
  signIn(){
    this.userService.signIn(this.email.value, this.mdp.value)
  }
  get(){
    this.userService.get()
  }
}
