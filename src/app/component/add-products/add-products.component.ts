import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  productData = {
    productType: '',
    productName: '',
    category: '',
    image: [''],
    price: null,
    stock: null,
    description: ''
  };

  constructor(private http: HttpClient){

  }

  addProduct(){
    this.http.post("http://localhost:8085/admin/product", this.productData).subscribe((res: any) => {
      console.log(res);
    })
  }
}
