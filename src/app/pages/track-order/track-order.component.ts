import { CommonModule, LowerCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderStatusComponent } from '../../shared/order-status/order-status.component';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsService } from '../../service/userDetailsService/user-details.service';

@Component({
  selector: 'app-track-order',
  imports: [FormsModule, CommonModule, OrderStatusComponent, LowerCasePipe],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

  orderId: number | null = 0;
  order: any;
  message: string = '';
  userId: any = 0;
  
  constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserDetailsService){
    }

    ngOnInit(): void {
    }

  fetchOrderDetails(){
    this.userId = this.userService.getUserId();
    this.http.get("http://localhost:8085/order/orderId/" + this.orderId).subscribe((res: any) => {
      if(res === null){
        this.toastr.error("Please enter the valid order id");
      }
      else if(res.userId !== this.userId){
        this.toastr.error("Please enter the valid order id");
      } 
      else{
        this.order = res;
        console.log(3)
      }
    })
  }



}
