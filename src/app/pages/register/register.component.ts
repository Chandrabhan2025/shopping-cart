import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userObj: any ={
    username:'',
    fullName:'',
    phoneNumber:'',
    password:'',
    role:''
  }

  repeatPassword: any = '';
  isAgree: boolean = false;
  constructor(private http: HttpClient){
  }

  isFormValid(){
    return this.isUsernameValid() && this.isPasswordValid() && this.isAgree;
  }

  isUsernameValid(){
    return this.userObj.username.length >= 3 && this.userObj.username.length <=11;
  }

  isPasswordValid(){
    return this.userObj.password === this.repeatPassword;
  }

  onLogin(){
    if(this.isFormValid()){
      this.http.post("http://localhost:8090/auth/register", this.userObj, { responseType: 'text' }).subscribe(res => {
        console.log(res);
      })
    }else{
      console.log("Invalid details are filled");
    }
    
  }

}
