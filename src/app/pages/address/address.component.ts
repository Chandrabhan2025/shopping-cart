import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetailsService } from '../../service/userDetailsService/user-details.service';

@Component({
  selector: 'app-address',
  imports: [FormsModule, CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  addresObj: any = {
    fullName: '',         
    mobileNumber: 0,     
    flatNumber: 0,        
    city: '',             
    pinCode: 0,           
    state: ''  
  }

  userId: any = 0;

  constructor(private http: HttpClient, private userService: UserDetailsService){

  }

  placeOrder(){
    this.userId = this.userService.getUserId();
    this.http.post(`http://localhost:8085/order/${this.userId}/online`, this.addresObj, {responseType: 'text'}).subscribe((res:any)=>{
      console.log(res);
      if(res){
        window.open(res, '_blank');
      }
    })
  
  }
}
