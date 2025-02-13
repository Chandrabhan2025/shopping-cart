import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  selectedPaymentMode = 'all';
  selectedStatus = 'all';
  selectedOrderId = '';

  orderObj: any [] = [];
  filterOrderObj: any [] = [];

  constructor(private http: HttpClient){
    this.getAllOrders();
  }

  getAllOrders(){
    this.http.get("http://localhost:8085/admin/order/getall").subscribe((res: any) => {
      this.orderObj = res;
      this.filterOrderObj = [...this.orderObj];
      console.log(res);
    })
  }

  changeOrderStatus(order: any){
    this.http.put("http://localhost:8085/order/" + order.orderId + "/" +order.orderStatus, null).subscribe((res:any) =>{
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
