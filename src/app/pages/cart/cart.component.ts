import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotLoginComponent } from '../../shared/not-login/not-login.component';
import { UserDetailsService } from '../../service/userDetailsService/user-details.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, NotLoginComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
   
  token: string|null = localStorage.getItem("token");
  Quantity: number = 0;
  cartProduct: any;
  productDetails: any [] = [];
  userId: any  = 0;
  constructor(private http: HttpClient, private router: Router, private userService: UserDetailsService){
    this.getCartByUser();
    
  }
  ngOnInit(): void {
  }
  
  

  getCartByUser() {
    this.userId = this.userService.getUserId();
    this.http.get(`http://localhost:8085/cart/${this.userId}`).subscribe((res: any) => {
      console.log(this.userId);
      console.log(res);
      this.cartProduct = res;
      this.productDetails = [];
      this.Quantity = 0;
      console.log(res.items[0].quantity);
      
      for (let item of res.items) {
        this.http.get("http://localhost:8085/product/" + item.productId).subscribe(
          (productRes: any) => {
            this.productDetails.push(productRes);
            this.Quantity += item.quantity;
          },
          (error) => {
            console.error("Product not found for productId: ", item.productId);
            this.delteItem(item);
          }
        );
      }
    });
  }
  

  payment(){
    this.router.navigate(['/address']);
  }

  increaseProduct(item: any){
    this.http.post(`http://localhost:8085/cart/${this.userId}/${item.productId}`, null).subscribe((res: any) => {
      console.log(res);
      this.getCartByUser();
    })
    
  }

  decreaseProduct(item: any){
    this.http.delete(`http://localhost:8085/cart/${this.userId}/${item.productId}`, {responseType: "text"}).subscribe((res) => {
      console.log(res);
      this.getCartByUser();
    }) 
  }

  delteItem(item:any){
    this.http.delete(`http://localhost:8085/cart/item/${this.userId}/${item.productId}`, {responseType: "text"}).subscribe(res => {
      console.log(res);
      this.getCartByUser();
    })
  }

}
