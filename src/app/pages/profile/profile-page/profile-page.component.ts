import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{

  constructor(private http: HttpClient){}

  userData: any = {};
  isEditing = false;

  ngOnInit(): void {

    const storedData = localStorage.getItem('user');
    if(storedData){
      this.userData = JSON.parse(storedData);
    }
  }

  updateUser(){
    console.log(this.userData);
    this.http.put('http://localhost:8090/auth/update-user/' + localStorage.getItem('userId'), this.userData, {responseType: 'text'}).subscribe((res) => {
      console.log(res);
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(this.userData));
    })
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  

  

}
