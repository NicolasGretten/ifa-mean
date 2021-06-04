import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { UsersService} from "../users.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name = new FormControl('');
  email = new FormControl('');
  mdp = new FormControl('');

  constructor(private userService: UsersService) { }

  signUp(){
    this.userService.signUp(this.email.value, this.mdp.value, this.name.value)
  }

  ngOnInit(): void {
  }

}
