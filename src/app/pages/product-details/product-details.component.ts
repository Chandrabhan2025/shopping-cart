import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId: number | null = 0;
  product: any;

  constructor(private http: HttpClient, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.productId = parseInt(id, 10);
        this.fetchProductDetails(this.productId);
      }
    })
  }

  fetchProductDetails(productId: number): void{
    this.http.get("http://localhost:8085/product/" + productId).subscribe((res:any) => {
      this.product = res;
    })
  }

  addToCart(productId: number) {
    console.log('Product ID added to cart:', productId);
    // You can now add this product ID to your cart array or perform any other action
    this.http.post("http://localhost:8085/cart/1/"+productId, null).subscribe((res: any) => {
      console.log(res);
    })
  }


}
