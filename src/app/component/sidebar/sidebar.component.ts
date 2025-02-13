import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddProductsComponent } from '../add-products/add-products.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-sidebar',
  imports: [AddProductsComponent, CommonModule, FormsModule, ProductListComponent, OrderDetailsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    addProduct: boolean = false;
    getAllProduct: boolean = false;
    getAllOrders: boolean = false;

    changeAddProduct(){
      this.addProduct= !this.addProduct;
      this.getAllOrders = false;
      this.getAllProduct = false;
    }

    changeAddProductList(){
      this.getAllProduct = !this.getAllProduct;
      this.addProduct = false;
      this.getAllOrders = false;
    }

    changeGetAllOrders(){
      this.getAllProduct = false
      this.addProduct = false;
      this.getAllOrders = !this.getAllOrders;
    }
}
