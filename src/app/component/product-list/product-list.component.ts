import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productType: string [] = [];
  category: string [] = [];
  selectedProduct: any = null;
  productDetails: any [] = []

  filteredProducts: any [] = [];

  selectedPriceSort: string = 'all';
  selectedProductType: string = 'all';
  selectedCategory: string = 'all';

  constructor(private http: HttpClient){
    this.getAllProduct();
  }

  getAllProduct(){
    this.http.get("http://localhost:8085/product").subscribe((res: any) => {
      console.log(res);
      this.productDetails = res;
      this.filteredProducts = [...this.productDetails];

      const uniqueCategory: Set<string> = new Set();
      this.productDetails.forEach((product: any) => {
        if(product.category){
          uniqueCategory.add(product.category);
        }
      })
      this.category = Array.from(uniqueCategory);

      const uniqueProductType: Set<string> = new Set();
      this.productDetails.forEach((product: any) => {
        if(product.productType){
          uniqueProductType.add(product.productType);
        }
      })
      this.productType = Array.from(uniqueProductType);
    })
  }

  editProduct(product: any){
    this.selectedProduct = product;
    console.log(product);
  }

  updateProduct(){
    this.http.put("http://localhost:8085/product", this.selectedProduct).subscribe((res: any) => {
      console.log(res);
    })
    this.selectedProduct = null;
  }

  deleteProduct(id: number){
    this.http.delete("http://localhost:8085/admin/product/" + id).subscribe((res: any) => {
      console.log(res);
    })
    this.getAllProduct();
  }

  sortByPrice(): void {
    console.log(this.selectedPriceSort);
    if (this.selectedPriceSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedPriceSort === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  sortByProductType(): void{
    console.log(this.selectedProductType);
    if(this.selectedProductType && this.selectedProductType !== 'all'){
      this.filteredProducts = this.productDetails.filter(product => product.productType === this.selectedProductType);
    }else{
      this.filteredProducts = [...this.productDetails];
    }
  }

  sortByCategory(): void{
    console.log(this.selectedCategory);
    if(this.selectedCategory && this.selectedCategory !== 'all'){
      this.filteredProducts = this.productDetails.filter(product => product.category === this.selectedCategory)
    }else{
      this.filteredProducts = [...this.filteredProducts];
    }
  }

  clearAllFilter(): void{
    this.selectedPriceSort = 'all';
    this.selectedCategory = 'all';
    this.selectedProductType = 'all';
    this.filteredProducts = [...this.productDetails];
  }
}
