import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  previousPassword: string = '';
  newPassword: string = '';
  reapeatNewPassword: string = '';
  error: boolean = false;


  checkPassword(){
    console.log(1)
    if(this.newPassword !== this.reapeatNewPassword){
      this.error = true;
    }else{
      this.error = false;
    }
  }



}
