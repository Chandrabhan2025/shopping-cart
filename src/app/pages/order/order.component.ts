import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderStatusComponent } from '../../shared/order-status/order-status.component';
import { UserDetailsService } from '../../service/userDetailsService/user-details.service';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  selectedPaymentMode = 'all';
    selectedStatus = 'all';
    selectedOrderId = '';
    userId: any = 0;
  
    orderObj: any [] = [];
    filterOrderObj: any [] = [];
  
    constructor(private http: HttpClient, private userService: UserDetailsService){
      this.getAllOrders();
    }
  
    getAllOrders(){
      this.userId = localStorage.getItem("userId");
      this.http.get(`http://localhost:8085/order/${this.userId}`).subscribe((res: any) => {
        this.orderObj = res;
        this.filterOrderObj = [...this.orderObj];
        console.log(res);
      })
    }
  
    sortByPaymentStatus(){
      if(this.selectedPaymentMode && this.selectedPaymentMode !== 'all'){
        this.filterOrderObj = this.orderObj.filter(order => order.modeOfPayment === this.selectedPaymentMode)
      }else{
        this.filterOrderObj = [...this.filterOrderObj];
      }  
    }
  
    sortByOrderStatus(){
      if(this.selectedStatus && this.selectedStatus !== 'all'){
        this.filterOrderObj = this.orderObj.filter(order => order.orderStatus === this.selectedStatus)
      }else{
        this.filterOrderObj = [...this.filterOrderObj];
      } 
    }
  
    searchByOrderId(){
      if(this.selectedOrderId ===''){
        this.filterOrderObj = [...this.orderObj];
      }else{
        this.filterOrderObj = this.orderObj.filter(order => order.orderId.toString() === this.selectedOrderId);
      }
    }
  
    clearAllFilter(): void{
      this.selectedPaymentMode = 'all';
      this.selectedStatus = 'all';
      this.filterOrderObj = [...this.orderObj];
    }
}
