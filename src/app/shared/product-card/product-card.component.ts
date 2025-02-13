import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserDetailsService } from '../../service/userDetailsService/user-details.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() productData: any [] = [];
  userId: any = 0;

  constructor(private http: HttpClient, private userService: UserDetailsService){
    this.userId = userService.getUserId();
  }

  addToCart(productId: number) {
    console.log('Product ID added to cart:', productId);
    // You can now add this product ID to your cart array or perform any other action
    this.http.post(`http://localhost:8085/cart/${this.userId}/${productId}`, null).subscribe((res: any) => {
      console.log(res);
    })
  }
  
}
